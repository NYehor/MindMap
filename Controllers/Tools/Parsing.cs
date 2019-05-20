using Newtonsoft.Json;
using Procoder.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Procoder.Controllers.Tools
{
    enum Status : byte { own = 1, sharable = 2, trash = 3 }

    public class Parsing
    {
        //used Unicode
        public Map ParseMapFromFront(string js)
        {
            Map info = JsonConvert.DeserializeObject<Map>(js);
            info.LastEdit = DateTime.Now;
            return info;
        }
    }


}
