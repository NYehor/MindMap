using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Procoder.Models;

namespace Procoder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IRepositoryUsers repositoryUsers;
        private IRepositoryMaps repositoryMaps;

        public UsersController(IRepositoryUsers repU, IRepositoryMaps repM) { repositoryUsers = repU; repositoryMaps = repM; }

        //GET/users
        //get list of all users
        [HttpGet]
        public JsonResult GetUsers()
        {
            return repositoryUsers.GetAllUser();
        }

        //GET/users/ID
        //get concrete user
        [Route("api/users/{id}")]
        [HttpGet("{id:int}")]
        public JsonResult GetUser(int id)
        {
            return repositoryUsers.GetUser(id);
        }

        //POST/users
        //add new user
        //[HttpPost]
        //public bool AddUser([FromBody] User value)
        //{

        //}

        //POST/users/ID/maps/ID ??????
        //add new map from concrete user
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

        //}

        //PUT/users/maps/ID
        //edit map from concrete user
        //[Route("api/users/id/maps/{id:int}")]
        //[HttpPut]
        //public bool EditUserMap(int userId, [FromBody] Map value)
        //{

        //}

        //DELETE/users/ID
        //delete concrete user
        //[Route("api/users/{id:int}")]
        //[HttpDelete]
        //public bool DeleteUser(int userId)
        //{

        //}

        //DELETE/users/ID/maps/ID
        //delete concrete map from concrete user 
        //[Route("api/users/id/maps/{id:int}")]
        //[HttpDelete]
        //public bool DeleteMap(int mapId)
        //{

        //}

    }
}
