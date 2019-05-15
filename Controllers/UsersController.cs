using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Procoder.Models;
using Procoder.Services.Security;

namespace Procoder.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IAuthenticateService authenticateService;

        public UsersController(IAuthenticateService authenticateService)
        {
            this.authenticateService = authenticateService;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]User userParam)
        {
<<<<<<< HEAD
            var user = authenticateService.Authenticate(userParam.Login, userParam.Password);
=======
            return repositoryUsers.GetUser(id);
        }

        //POST/users
        //add new user
        [Route("api/[controller]")]
        [HttpPost]
        public ActionResult<bool> AddUser([FromBody] User value)
        {
            return repositoryUsers.AddNewUser();
        }

        //POST/users/ID/maps/ID ??????
        //add new map from concrete user
        //https://metanit.com/sharp/entityframework/6.7.php to use stored procedure
        //[Route("api/users/{id}/maps/id")]
        //[HttpPost]
        //public bool AddUserMap(int userId, [FromBody] string value)
        //{

        //}

        //PUT/users/ID
        //edit concrete user
        //[Route("api/users/{id:int}")]
        //[HttpPut]
        //public bool EditUser(int id, [FromBody] User value)
        //{
>>>>>>> origin/dev_back_tests

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }
    }
}
