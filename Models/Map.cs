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
        public ICollection<Node> Nodes { get; set; }

        [JsonIgnore]
        public DateTime CreateData { get; set; }

        [JsonIgnore]
        public DateTime LastEdit { get; set; }

        [JsonIgnore]
        public int UserId { get; set; }

        [JsonIgnore]
        public User User { get; set; }
    }
}
