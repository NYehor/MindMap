using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Procoder.Configurations;
using Procoder.Models;
using Procoder.ModelsDto;
using Procoder.Repositories;

namespace Procoder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly AppSettings appSettings;
        private readonly IProcoderDB procoderDB;

        public RegistrationController(IProcoderDB procoderDB, IOptions<AppSettings> appSetting)
        {
            this.procoderDB = procoderDB;
            this.appSettings = appSetting.Value;
        }

        [HttpPost("adduser")]
        public async Task<IActionResult> AddUser([FromBody]Credential credential)
        {
            if (credential.Email == null || credential.Password == null)
            {
                return Ok("Credential is not complete");
            }
            if(credential.Password.Length < 10)
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

            string link = appSettings.Domain + "/api/registration/" + credential.Email + "/" + newUser.Id;

            IEmailService emailService = new EmailService(appSettings);
            int timeout = appSettings.STMPConnection.TimeOut;
            var task = emailService.ConfirmEmail(credential.Email, link);

            if (await Task.WhenAny(task, Task.Delay(timeout)) == task)
            {
                if (task.IsFaulted)
                    return Ok("TimeOut");

                return Ok("Email send to " + credential.Email);
            }

            return Ok();
        }

        [HttpGet("{email}/{id}")]

        [Produces("application/json")]
        public IActionResult ConfirmEmail(string email, int id)
        {

            User user = procoderDB.UserRepository.GetByEmail(email);

            if (user.Id == id)
            {
                user.IsEmailValid = true;
                procoderDB.UserRepository.Update(user);
                procoderDB.Save();
                string token = TokenFactory.Get(email, appSettings.Secret);
                return Ok(new { Token = token });
            }

            return BadRequest("Broken link, ");
        }
    }
}