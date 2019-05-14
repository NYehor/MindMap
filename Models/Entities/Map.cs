using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Procoder.Models
{
    [Serializable]
    public class Map
    {
        [Column("user_id")]
        public int userId { get; set; }
        [Column("map_id")]
        public int id { get; set; }
        [Column("map_category")]
        public string category { get; set; }
        [Column("status")]
        public char status { get; set; }
        [Column("map_name")]
        public string name { get; set; }

        [Column("create_data")]
        public DateTime CreateData { get; set; }
        [Column("last_edit")]
        public DateTime LastEdit { get; set; }
        public List<Nodes> Nodes { get; set; }
    }
}
