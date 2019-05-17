using Newtonsoft.Json;
using Procoder.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Procoder.Controllers.Tools
{

    enum S : byte { own = 1, sharable = 2, trash = 3 }

    public static class Parsing
    {
        internal static Dictionary<int, string> Status = new Dictionary<int, string>
        {
            [1] = "own",
            [2] = "sharable",
            [3]= "trash"
        };

        //used Unicode
        public static Map ParseMapFromFront(string js)
        {
            Map info = JsonConvert.DeserializeObject<Map>(js);
            info.LastEdit = DateTime.Now;
            return info;
        }
    }


}
