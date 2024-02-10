namespace QLKhachSanAPI.Services.Implements
{
    using Microsoft.AspNetCore.Identity;
    using Models.DTOs;
    using Models;
    using Services.Interfaces;
    using Microsoft.EntityFrameworkCore;
    using DataAccess;
    using Microsoft.Data.SqlClient;
    using Microsoft.Extensions.Configuration;
    using System;
    using QLKhachSanAPI.Models.DAL;
    using Microsoft.Extensions.DependencyInjection;

    public class AdminService : IAdminService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IUnitOfWork _unitOfWork;
        private readonly AppDbContext _context; // for role assignment
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public AdminService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, 
            IUnitOfWork unitOfWork, AppDbContext context, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _unitOfWork = unitOfWork;
            _context = context;
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("MSSQLConnection"); // specify to match your appsettings.json
        }


        public async Task<bool> CreateStaffAccountAsyncEF(CreateEditStaffAccountModel model)
        {
           
            var check = await _unitOfWork.ApplicationUserRepository.GetSingleAsync(d=>d.UserName == model.UserName);
            if(check != null)
            {
                return false;
            }
            List<object> errors = new List<object>(14);

            string defaultRole = "Staff";  // initial default role
            string defaultPassword = "Abc@123";

            // direct assign (use tinymapper if you want)
            var applicationUser = new ApplicationUser()
            {
                UserName = model.UserName,
                Email = model.Email,
                FullName = model.FullName
                // DateJoined is automatically initialized in ApplicationUser class
            };

            try
            {
                // create role if not exist:
                bool isRoleExist = await _roleManager.RoleExistsAsync(defaultRole); // take in roleName(string)
                if (!isRoleExist)
                {
                    var newRole = new IdentityRole(defaultRole);
                    IdentityResult rsNewRole = await _roleManager.CreateAsync(newRole);
                    if (!rsNewRole.Succeeded)
                    {
                        errors.AddRange(rsNewRole.Errors);
                    }
                }

                // Try to create the user
                IdentityResult rsRegister = await _userManager.CreateAsync(applicationUser, defaultPassword);

                if (rsRegister.Succeeded)
                {
                    // assign role to user:
                    await _userManager.AddToRoleAsync(applicationUser, defaultRole);

                    #region (Background Job Scheduling) Mail Send
                    //BackgroundJob.Enqueue(() => SendConfirmationEmail(applicationUser));
                    #endregion

                    //_logger.LogInformation($"\nNew user registered (UserName: {applicationUser.UserName})\n");
                }
                else
                {      
                    errors.AddRange(rsRegister.Errors);
                }


                return true;
            }
            catch (Exception ex)
            {
                //throw ex; // cause a mess
                errors.Add(ex.Message);
                Console.WriteLine(errors.ToString());
                return false;
            }

        }

        public async Task<bool> ModifyStaffAccountAsyncEF(CreateEditStaffAccountModel model)
        {
            var userToModify = await _userManager.FindByIdAsync(model.IdToUpdate!);
            var check = await _unitOfWork.ApplicationUserRepository.GetSingleAsync(d => d.UserName == model.UserName);
            if (check != null && userToModify.UserName!= model.UserName)
            {
                return false;
            }
           
            var errors = new List<IdentityError>();

            if (userToModify != null)
            {
                userToModify.UserName = model.UserName;
                userToModify.Email = model.Email;
                userToModify.FullName = model.FullName;

                IdentityResult result = await _userManager.UpdateAsync(userToModify);
                if (result.Succeeded)
                {
                    return true;
                }

                errors.AddRange(result.Errors);
                Console.WriteLine(errors.ToString());

                return false;
            }

            Console.WriteLine("User to be modified not found!");
            return false;
        }


        public async Task<bool> DeleteStaffAccountAsyncEF(string userId)
        {
            var userToDelete = await _userManager.FindByIdAsync(userId);
            var errors = new List<IdentityError>();

            if (userToDelete != null)
            {
                IdentityResult result = await _userManager.DeleteAsync(userToDelete);
                if (result.Succeeded)
                {
                    return true;
                }

                errors.AddRange(result.Errors);
                Console.WriteLine(errors.ToString() );

                return false;
            }

            Console.WriteLine("User to be deleted not found!");
            return false;
        }

        public async Task<List<ApplicationUserViewModel>> GetAllUserWithRole()
        {
            var users = await _userManager.Users.OrderByDescending(u => u.DateJoined).ToListAsync();

            var usersWithRoles = new List<ApplicationUserViewModel>();
            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);

                var userWithRoles = new ApplicationUserViewModel
                {
                    // Cập nhật các thuộc tính tương ứng trong ApplicationUserViewModel
                    IdToUpdate=user.Id,
                    FullName=user.FullName,
                    UserName = user.UserName!,
                    Email = user.Email!,
                    Roles = roles.ToList(),
                    DateJoined = user.DateJoined
                };

                usersWithRoles.Add(userWithRoles);
            }

            return usersWithRoles;
        }

        public async Task<List<ApplicationUserViewModel>> GetAllUserWithRoleADO()
        {
            var usersWithRoles = new List<ApplicationUserViewModel>();

            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                var commandText = @"
            SELECT 
                u.Id AS IdToUpdate,
                u.FullName,
                u.UserName,
                u.Email,
                r.Name AS Role,
                u.DateJoined
            FROM 
                Users u
            LEFT JOIN 
                UserRoles ur ON u.Id = ur.UserId
            LEFT JOIN 
                Roles r ON ur.RoleId = r.Id
            ORDER BY 
                u.DateJoined DESC";

                using (var command = new SqlCommand(commandText, connection))
                {
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var userId = reader["IdToUpdate"].ToString();
                            var fullName = reader["FullName"].ToString();
                            var userName = reader["UserName"].ToString();
                            var email = reader["Email"].ToString();
                            var role = reader["Role"].ToString();
                            var dateJoined = (DateTimeOffset)reader["DateJoined"];

                            var userWithRoles = usersWithRoles.FirstOrDefault(u => u.IdToUpdate == userId);

                            if (userWithRoles == null)
                            {
                                userWithRoles = new ApplicationUserViewModel
                                {
                                    IdToUpdate = userId,
                                    FullName = fullName,
                                    UserName = userName,
                                    Email = email,
                                    Roles = new List<string>(),
                                    DateJoined = dateJoined
                                };

                                usersWithRoles.Add(userWithRoles);
                            }

                            userWithRoles.Roles.Add(role);
                        }
                    }
                }
                await connection.CloseAsync();
            }

            return usersWithRoles;
        }


        public async Task<ApplicationUserViewModel> GetUser(string id)
        {
            var user= await _unitOfWork.ApplicationUserRepository.GetSingleAsync(d => d.Id == id);
            return new ApplicationUserViewModel
            {
                IdToUpdate=id,
                UserName=user.UserName,
                Email =user.Email,
                FullName= user.FullName,
            };
        }

        #region Role assignment
        public async Task<List<UserInRoleInfo>> FetchRolesOfUser(string userId)
        {
            try
            {
                var user = await _context.Users.FindAsync(userId);

                if (user == null)
                {
                    throw new Exception($"User with ID '{userId}' not found.");
                }

                var userRoles = await _context.Roles
                    .Select(r => new UserInRoleInfo
                    {
                        RoleId = r.Id,
                        RoleName = r.Name,
                        IsInRole = _context.UserRoles
                            .Where(ur => ur.UserId == userId && ur.RoleId == r.Id)
                            .Any()
                    })
                    .ToListAsync();

                return userRoles;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching roles of designated user: {ex.Message}");
                throw;
            }
        }


        public async Task<bool> UpdateUserRolesAsync(string userId, List<UserInRoleInfo> data)
        {
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    // Clear all existing roles of the targeted user
                    var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
                    if (user != null)
                    {
                        var existingUserRoles = await _context.UserRoles.Where(ur => ur.UserId == user.Id).ToListAsync();
                        _context.UserRoles.RemoveRange(existingUserRoles);
                        await _context.SaveChangesAsync();

                        // Add or remove roles based on IsInRole field in the request body
                        foreach (var userRole in data)
                        {
                            if (userRole.IsInRole)
                            {
                                // If IsInRole is true, add the role to the user
                                _context.UserRoles.Add(new IdentityUserRole<string>
                                {
                                    UserId = user.Id,
                                    RoleId = userRole.RoleId
                                });
                            }
                        }

                        await _context.SaveChangesAsync();
                        await transaction.CommitAsync();

                        return true;
                    }

                    Console.Error.WriteLine("User not found.");
                    return false;
                }
                catch (Exception ex)
                {
                    Console.Error.WriteLine($"Internal Server Error: {ex.Message}");
                    await transaction.RollbackAsync();
                    return false;
                }
            }
        }

        #endregion
    }
}
