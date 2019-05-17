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
 //   [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MapsController : ControllerBase
    {
        private IProcoderDB procoderDB;

        public MapsController(IProcoderDB procoderDB)
        {
            this.procoderDB = procoderDB;
        }

        [HttpPost]
        [HttpPost("putmap")]
        public IActionResult PutMap([FromBody]string jsonFile)
        {
            if(jsonFile == string.Empty || jsonFile == null)
                return Ok(new { OK = "No" });

            Map info = JsonConvert.DeserializeObject<Map>(jsonFile);
            info.LastEdit = DateTime.Now;

            Console.WriteLine(info.Name);
            return Ok(new {OK="ok"});
        }

    }
}