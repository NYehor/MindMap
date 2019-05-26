using Microsoft.Extensions.Options;
using Procoder.Configurations;
using Procoder.Repositories;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Procoder.ModelServices.Interface;
using Newtonsoft.Json;

namespace Procoder.ControllersOld
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService userService;

        public AuthController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost("sign-up")]
        public IActionResult SignUp([FromBody] Credential credential)
        {
            try
            {
                userService.SignUp(credential.Name, credential.Email, credential.Password);
                var user = userService.LogInAndTakeUser(credential.Email, credential.Password);

                return Ok(JsonConvert.SerializeObject(user));
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }   

        [HttpPost("log-in")]
        public IActionResult LogIn([FromBody] Credential credential)
        {
            try
            {
                var user = userService.LogInAndTakeUser(credential.Email, credential.Password);

                return Ok(JsonConvert.SerializeObject(user));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("sign-out")]
        public void SignOut([FromBody] string value)
        {
            try
            {
                userService.SignOut();
            }
            catch
            {

            }
        }
    }
}