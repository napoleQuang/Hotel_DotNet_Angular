namespace QLKhachSanAPI.Services.Interfaces
{
    using Models;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;

    public interface IAuthTokenService
    {
        Task<JwtSecurityToken?> GenerateAccessTokenAsync(ApplicationUser user, IEnumerable<string> roles, bool rememberMe);
        Task<string> GenerateRefreshTokenAsync();
        Task<ClaimsPrincipal> GetPrincipalFromExpiredTokenAsync(string token);
    }
}
