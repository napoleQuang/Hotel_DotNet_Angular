namespace QLKhachSanAPI.Models.EmailModels
{
    using MimeKit;
    using System.Net.Mail;


    public class Message
    {
        public string Name { get; set; }
        public List<MailboxAddress> To { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }

        public IFormFileCollection Attachments { get; set; }
        public Message(string name, IEnumerable<string> to, string subject, string content, IFormFileCollection attachments)
        {
            Name = name;
            To = new List<MailboxAddress>();

            // from new MimeKit version, MailboxAddress takes at least 2 arguments !
            To.AddRange(to.Select(x => new MailboxAddress(Name, x)));
            Subject = subject;
            Content = content;
            Attachments = attachments;
        }
    }
}
