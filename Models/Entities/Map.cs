using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Procoder.Models
{
    [Serializable]
    public class Map
    {
        [Column("user_id")]
        public int userId { get; set; }
        [JsonProperty("Id")]
        [Column("map_id")]
        public int Id { get; set; }
        //only from front 
        //[]
        [JsonProperty("Category")]
        public string Category { get; set; }

        [Column("map_category")]
        public char Cat { get; set; }

        [JsonProperty("Status")]
        [Column("status")]
        public char Status { get; set; }

        [JsonProperty("Name")]
        [Column("map_name")]
        public string Name { get; set; }

        [Column("create_data")]
        public DateTime CreateData { get; set; }
        [Column("last_edit")]
        public DateTime LastEdit { get; set; }

        [JsonProperty("Nodes")]
        public List<Nodes> Nodes { get; set; }
    }
}
