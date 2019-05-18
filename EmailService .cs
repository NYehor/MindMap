using MimeKit;
using MailKit.Net.Smtp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Procoder.Configurations;
using Microsoft.Extensions.Options;

namespace Procoder
{
    public class EmailService : IEmailService
    {
        private readonly AppSettings appSettings;

        public EmailService(IOptions<AppSettings> appSetting)
        {
            this.appSettings = appSetting.Value;
        }

        public EmailService(AppSettings appSetting)
        {
            this.appSettings = appSetting;
        }

        public async Task SendEmailAsync(string email, string subject, string message)
        {
            try
            {
                var emailMessage = new MimeMessage();

                emailMessage.From.Add(new MailboxAddress(appSettings.STMPConnection.CompanyName,
                    appSettings.STMPConnection.UserName));
                emailMessage.To.Add(new MailboxAddress("", email));
                emailMessage.Subject = subject;
                emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
                {
                    Text = message
                };

                using (var client = new SmtpClient())
                {
                    await client.ConnectAsync(appSettings.STMPConnection.Server,
                        appSettings.STMPConnection.Port, appSettings.STMPConnection.UseSSL);
                    await client.AuthenticateAsync(appSettings.STMPConnection.UserName, appSettings.STMPConnection.Password);
                    await client.SendAsync(emailMessage);

                    await client.DisconnectAsync(true);
                }
            }
            catch
            {
                throw new Exception();
            }
        }

        public async Task ConfirmEmail(string email, string link)
        {
            await SendEmailAsync(email, "Confirm email:", link);
        }
    }
}
