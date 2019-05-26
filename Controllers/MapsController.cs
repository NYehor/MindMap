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
using Procoder.ModelServices.Interface;
using Procoder.DTO;

namespace Procoder.Controllers
{
    [Authorize]
    [Route("user/{user_id}/[controller]")]
    [ApiController]
    public class MapsController : ControllerBase
    {
        private readonly IMapService mapService;

        public MapsController(IMapService mapService)
        {
            this.mapService = mapService;
        }

        [Authorize]
        [HttpPost]
        public IActionResult Create(int user_id)
        {
            try
            {
                var newMap = mapService.Create(user_id);
                return Ok(JsonConvert.SerializeObject(newMap));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [Authorize]
        [HttpPost("{map_Id}")]
        public IActionResult Save([FromBody]object jsonFile, int user_id, int map_id)
        {
            try
            {
                mapService.Save(jsonFile, user_id, map_id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [Authorize]
        [HttpDelete("{map_id}")]
        public IActionResult Delete(int user_id, int map_Id)
        {
            try
            {
                mapService.Delete(user_id, map_Id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [Authorize]
        [HttpDelete]
        public IActionResult DeleteTrash(int user_id)
        {
            try
            {
                mapService.DeleteUserTrashMaps(user_id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [Authorize]
        [HttpGet]
        [Produces("application/json")]
        public IActionResult Get(int user_id)
        {
            var maps = mapService.GetAllUserMaps(user_id);
            var jsFile = JsonConvert.SerializeObject(maps, Formatting.Indented);

            return Content(jsFile, "application/json");
        }

        [Authorize]
        [HttpPost("{map_id}/status")]
        public IActionResult ChangeStatus(int map_id, [FromBody]string status)
        {
            try
            {
                mapService.ChangeStatus(map_id, status);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [Authorize]
        [HttpPost("category")]
        public IActionResult ChangeCategory(int user_id, [FromBody]Category category)
        {
            try
            {
                mapService.ChangeMapsCategory(user_id, category.OldName, category.NewName);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [Authorize]
        [HttpPost("category/{map_id}")]
        public IActionResult ChangeMapCategory(int map_id, [FromBody]string Category)
        {
            try
            {
                mapService.ChangeCategory(map_id, Category);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}