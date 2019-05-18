using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Procoder
{
    public interface IEmailService
    {
        Task SendEmailAsync(string email, string subject, string message);
        Task ConfirmEmail(string email, string link);
    }
}
