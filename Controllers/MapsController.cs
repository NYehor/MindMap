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

        [Authorize]
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

        [Authorize]
        [HttpPost("{map_Id}")]
        public IActionResult Save([FromBody]object jsonFile, int user_id, int map_id)
        {
            string jsFile = Convert.ToString(jsonFile);
            if(jsFile == string.Empty || jsFile == null)
                return Ok(new { OK = "No" });

            Map map = JsonConvert.DeserializeObject<Map>(jsFile);
            map.LastEdit = DateTime.Now;
            map.UserId = user_id;

            Map existMap = procoderDB.MapRepository.GetById(map_id);

            foreach (var node in map.Nodes)
            {
                bool flag = true;
                foreach (var existNode in existMap.Nodes)
                {
                    if (node.Id == existNode.Id)
                    {
                        node.MapId = map.Id;
                        procoderDB.NodeRepository.Update(node);
                        procoderDB.Save();
                        flag = false;
                    }
                }

                if (flag)
                {
                    node.MapId = map.Id;
                    procoderDB.NodeRepository.Create(node);
                    procoderDB.Save();
                }
            }

            if (procoderDB.MapRepository.IsExist(map.Id))
            {
                procoderDB.MapRepository.Update(map);
                procoderDB.Save();
            }
            else
                BadRequest("Map is not exist");

            return Ok();
        }

        [Authorize]
        [HttpDelete("{map_id}")]
        public IActionResult Delete(int user_id, int map_Id)
        {
            procoderDB.MapRepository.Delete(user_id, map_Id);
            procoderDB.Save();
            return Ok();
        }

        [Authorize]
        [HttpGet]
        [Produces("application/json")]
        public IActionResult Get(int user_id)
        {
            var user = procoderDB.UserRepository.GetById(user_id);

            if (user == null)
                BadRequest("User is not exist ");

            if (user.Maps != null)
            {
                var maps = procoderDB.MapRepository.GetAllMaps(user_id);
                var jsFile = JsonConvert.SerializeObject(maps, Formatting.Indented);

                return Content(jsFile, "application/json");
            }
            else
                BadRequest("Maps is not exist ");


            return BadRequest();
        }
    }
}