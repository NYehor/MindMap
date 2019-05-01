using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Procoder.Models
{
    [Serializable]
    public class Map
    {
        public int MapId { get; set;}
        public string MapImgUrl { get; set; }
        public string MapName { get; set; }
        public DateTime CreateData { get; set; }
        public DateTime LastEdit { get; set; }
        public int PrevNode { get; set; }
        public int CurNode { get; set; }
        public int NextNode { get; set; }
    }
}
