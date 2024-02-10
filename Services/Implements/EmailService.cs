namespace QLKhachSanAPI.Services.Implements
{
    using QLKhachSanAPI.Services.Interfaces;
    using Microsoft.Extensions.Options;
    using MimeKit;
    using MailKit.Net.Smtp;
    using QLKhachSanAPI.Models.EmailModels;

    public class EmailService : IEmailService
    {
        private readonly EmailConfiguration _emailConfig;
        public EmailService(EmailConfiguration emailConfiguration)
        {
            _emailConfig = emailConfiguration;
        }

        public async Task<bool> SendEmailAsync(Message message)
        {
            try
            {
                var emailMessage = CreateEmailMessage(message);
                await Task.FromResult(Send(emailMessage));
            }
            catch (Exception ex)
            {
                Console.WriteLine("***  Failed to send mail: ", ex);
                return false;
            }

            return true;
        }

        private MimeMessage CreateEmailMessage(Message message)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("The Nexus Hotel", _emailConfig.From));
            emailMessage.To.AddRange(message.To);
            emailMessage.Subject = message.Subject;

            //======Using Text in the Email Message Body========
            // emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Text)
            // {
            //     Text = message.Content
            // };

            //======Using HTML in the Email Message Body========
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                //Text = string.Format("<h2 style='color:blue;'>{0}</h2>", message.Content)
                Text = string.Format("<p>Hi {0},</p><p>{1}</p><p>We hope to see you soon at the hotel</p><p>Thanks,</p><p>The Nexus Hotel Team</p><p>*******Please do not reply to this email. This is auto generated email.*******&quot;</p>", string.Join(",", message.To), message.Content)
            };


            return emailMessage;
        }

        private async Task Send(MimeMessage mailMessage)
        {
            using (var client = new MailKit.Net.Smtp.SmtpClient())
            {
                try
                {
                    client.CheckCertificateRevocation = false;
                    client.Connect(_emailConfig.SmtpServer, _emailConfig.Port, true);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    client.Authenticate(_emailConfig.UserName, _emailConfig.Password);
                    client.Send(mailMessage);
                }
                catch
                {
                    throw;
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
        }



    }
}
