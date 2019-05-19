using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Procoder.Models;
using Procoder.Controllers.Tools;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.Extensions.Options;
using Procoder.Configurations;
using Procoder.Repositories;
using Procoder.ModelsDto;
using Google.Apis.Auth;

namespace Procoder.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppSettings appSettings;
        private readonly IProcoderDB procoderDB;

        public UsersController(IOptions<AppSettings> appSettings, IProcoderDB procoderDB)
        {
            this.procoderDB = procoderDB;
            this.appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        [Produces("application/json")]
        public ActionResult<User> Authenticate(Credential credential)
        {
            User user = procoderDB.UserRepository.Authenticate(credential.Email, credential.Password);

            if (user == null || user.IsEmailValid == false)
            {
                return BadRequest(new { message = "Username or password is wrong" });
            }

            string token = TokenFactory.Get(user.Email.ToString(), appSettings.Secret);

            return Ok(new { Token = token });        
        }

        [AllowAnonymous]
        [HttpPost("sign-in")]
        public async Task<IActionResult> GoogleSignIn(string tokenId)
        {
            try
            {
                var payload = GoogleJsonWebSignature.ValidateAsync(tokenId, new GoogleJsonWebSignature.ValidationSettings()).Result;

                var user = procoderDB.UserRepository.GetByEmail(payload.Email);
                if (user == null)
                {
                    user = new User()
                    {
                        Email = payload.Email,
                        DateRegistration = DateTime.Now,
                        Name = payload.Name,
                        IsEmailValid = true
                    };
                    procoderDB.UserRepository.Create(user);
                    procoderDB.Save();
                }
                string token = TokenFactory.Get(user.Email.ToString(), appSettings.Secret);

                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                BadRequest(ex.Message);
            }
            return BadRequest();
        }

        [HttpPost("test")]
        [Produces("application/json")]
        public ActionResult Test()
        {
            return Ok("It's Ok)");
        }
    }
}
