namespace QLKhachSanAPI.Services.Interfaces
{
    using Models.EmailModels;

    public interface IEmailService
    {
        Task<bool> SendEmailAsync(Message message);
    }
}
