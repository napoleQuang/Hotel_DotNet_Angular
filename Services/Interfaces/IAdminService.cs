namespace QLKhachSanAPI.Services.Interfaces
{
    using Models.DTOs;

    public interface IAdminService
    {
        Task<bool> CreateStaffAccountAsyncEF(CreateEditStaffAccountModel model);
        Task<bool> ModifyStaffAccountAsyncEF(CreateEditStaffAccountModel model);
        Task<bool> DeleteStaffAccountAsyncEF(string userId);
        Task<List<ApplicationUserViewModel>> GetAllUserWithRole();
        Task<List<ApplicationUserViewModel>> GetAllUserWithRoleADO();
        Task<ApplicationUserViewModel> GetUser(string id);
        Task<List<UserInRoleInfo>> FetchRolesOfUser(string userId);
        Task<bool> UpdateUserRolesAsync(string userId, List<UserInRoleInfo> data);
    }
}
