using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Procoder.Models;

namespace Procoder.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class MapsController : ControllerBase
    {
        private IRepositoryMaps repositoryMaps;
        public MapsController(IRepositoryMaps rep) => repositoryMaps = rep;

        ////GET/users/ID/maps
        ////get all maps from concrete user
        [Route("api/[controller]/{id:int}")]
        [HttpGet]
        public JsonResult GetMapsList(int id)
        {
            return repositoryMaps.GetAllMyMaps(id);
        }


        ////GET/users/ID/maps/ID
        ////get concrete map from concrete user
        [Route("api/user/maps/{mapId:int}")]
        [HttpGet]
        public ActionResult<IEnumerable<IMapForList>> GetMap(int mapId)
        {
            return repositoryMaps.GetConcreteMap(mapId);
        }



    }
}