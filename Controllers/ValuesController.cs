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
    public class ValuesController : ControllerBase
    {
        private IRepository repository;
        public ValuesController(IRepository rep) => repository = rep;

        //GET/users
        //get list of all users
        //[HttpGet]
        public JsonResult GetUsers()
        {
            return repository.GetAllUser();
        }

        //GET/users/ID
        //get concrete user
        //[HttpGet("{id:int}")]
        public JsonResult GetUser(int userId)
        {
            return repository.GetUser(userId);
        }

        //GET/users/ID/maps
        //get all maps from concrete user
        //[Route("api/users/{id}/maps")]
        //[HttpGet]
        //public ActionResult<IEnumerable<Map>> GetMapsList(int userId)
        //{

        //}


        //GET/users/ID/maps/ID
        //get concrete map from concrete user
        //[Route("api/users/id/maps/{id}")]
        //[HttpGet]
        //public ActionResult<Map> GetMap(int mapId)
        //{

        //}

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
