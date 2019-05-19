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
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("category")]
        public string Category { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }

        [JsonProperty("nodes")]
        public List<Node> Nodes { get; set; }

        public DateTime CreateData { get; set; }

        public DateTime LastEdit { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }
    }
}
