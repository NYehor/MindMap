using Microsoft.Extensions.Options;
using Procoder.Configurations;
using Procoder.Repositories;
using Procoder.ModelsDto;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Mvc;
using Procoder.Models;
using System;
using System.Threading.Tasks;

namespace Procoder.ControllersOld
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppSettings appSettings;
        private readonly IProcoderDB procoderDB;

        public AuthController(IOptions<AppSettings> appSettings, IProcoderDB procoderDB)
        {
            this.procoderDB = procoderDB;
            this.appSettings = appSettings.Value;
        }

        [HttpPost("sign-up")]
        public async Task<IActionResult> SignUp([FromBody] Credential credential)
        {
            if (credential.Email == null || credential.Password == null)
            {
                return Ok("Credential is not complete");
            }
            if (credential.Password.Length < 10)
                return Ok("Password is weak");

            User user = procoderDB.UserRepository.GetByEmail(credential.Email);

            if (user != null)
                return Ok("User already exist");

            User newUser = new User()
            {
                Email = credential.Email,
                Password = PasswordHasher.Hash(credential.Password),
                DateRegistration = DateTime.Now,
                IsEmailValid = false
            };
            procoderDB.UserRepository.Create(newUser);
            procoderDB.Save();

            IEmailService emailService = new EmailService(appSettings);
            int timeout = appSettings.STMPConnection.TimeOut;
            var task = emailService.ConfirmEmail(credential.Email, appSettings.EmailText);

            if (await Task.WhenAny(task, Task.Delay(timeout)) == task)
            {
                if (task.IsFaulted)
                    return Ok("TimeOut");

                string tok = TokenFactory.Get(newUser.Email, appSettings.Secret);
                return Ok(new { userId = newUser.Id, token = tok });
            }

            return Ok("WTF");
        }

        [HttpPost("log-in")]
        public IActionResult LogIn([FromBody] Credential credential)
        {
            User user = procoderDB.UserRepository.Authenticate(credential.Email, credential.Password);

            if (user == null || user.IsEmailValid == false)
            {
                return BadRequest(new { message = "Username or password is wrong" });
            }

            string tok = TokenFactory.Get(user.Email.ToString(), appSettings.Secret);

            return Ok(new { userId = user.Id, token = tok });
        }

        [HttpPost("sign-out")]
        public void SignOut([FromBody] string value)
        {

        }
    }
}