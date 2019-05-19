using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Procoder.Models;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;
using Procoder.Repositories;

namespace Procoder.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MapsController : ControllerBase
    {
        private IProcoderDB procoderDB;

        public MapsController(IProcoderDB procoderDB)
        {
            this.procoderDB = procoderDB;
        }

        [HttpPost("putmap")]
        public IActionResult PutMap([FromBody]object jsonFile)
        {
            string jsFile = Convert.ToString(jsonFile);
            if(jsFile == string.Empty || jsFile == null)
                return Ok(new { OK = "No" });

            Map map = JsonConvert.DeserializeObject<Map>(jsFile);
            map.LastEdit = DateTime.Now;

            if (!procoderDB.MapRepository.IsExist(map.Id))
                procoderDB.MapRepository.Update(map);
            else
                BadRequest("Map is not exist");

            return Ok();
        }

        [HttpGet("createmap")]
        [Produces("application/json")]
        public IActionResult CreateMap([FromBody]string email)
        {
            var user = procoderDB.UserRepository.GetByEmail(email);
            if (user != null)
            {
                var newMap = new Map()
                {
                    Id = user.Id,
                    CreateData = DateTime.Now
                };
                procoderDB.MapRepository.Create(newMap);
                procoderDB.Save();

                string jsFile = JsonConvert.SerializeObject(newMap);

                return Ok(jsFile);
            }
            else
                BadRequest("User is not exist ");

            return BadRequest();
        }

        [HttpGet("getmap/{mapId}")]
        [Produces("application/json")]
        public IActionResult GetMap(int mapId)
        {
            if (procoderDB.MapRepository.IsExist(mapId))
            {
                var map = procoderDB.MapRepository.GetById(mapId);
                string jsFile = JsonConvert.SerializeObject(map);

                return Ok(jsFile);
            }
            else
                BadRequest("User is not exist ");


            return BadRequest();
        }

        [HttpGet("getallmaps")]
        [Produces("application/json")]
        public IActionResult GetAllMap([FromBody]string email)
        {
            var user = procoderDB.UserRepository.GetByEmail(email);

            if (user.Maps != null)
            {
                string jsFile = JsonConvert.SerializeObject(user.Maps, Formatting.Indented);

                return Ok(jsFile);
            }
            else
                BadRequest("User is not exist ");


            return BadRequest();
        }
    }
}