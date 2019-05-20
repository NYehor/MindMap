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
    [Route("user/{user_id}/[controller]")]
    [ApiController]
    public class MapsController : ControllerBase
    {
        private IProcoderDB procoderDB;

        public MapsController(IProcoderDB procoderDB)
        {
            this.procoderDB = procoderDB;
        }

        [HttpPost]
        public IActionResult Post(int user_id)
        {
            var user = procoderDB.UserRepository.GetById(user_id);
            if (user != null)
            {
                var newMap = new Map()
                {
                    CreateData = DateTime.Now,
                    UserId = user.Id,
                    Nodes = new List<Node>()
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

        [HttpPost("{map_Id}")]
        public IActionResult Save([FromBody]object jsonFile, int user_id, int map_id)
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


        [HttpDelete("{map_id}")]
        public IActionResult Delete(int user_id, int mup_id)
        {
            procoderDB.MapRepository.Delete(mup_id);
            return Ok();
        }


        [HttpGet]
        [Produces("application/json")]
        public IActionResult Get(int user_id)
        {
            var user = procoderDB.UserRepository.GetById(user_id);

            if (user == null)
                BadRequest("User is not exist ");

            if (user.Maps != null)
            {
                var jsFile = JsonConvert.SerializeObject(user.Maps, Formatting.Indented);

                return Content(jsFile, "application/json");
            }
            else
                BadRequest("Maps is not exist ");


            return BadRequest();
        }
    }
}