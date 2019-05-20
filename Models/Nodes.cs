using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Procoder.Models
{
    public class Node
    {
        [JsonProperty("Id")]
        public string Id { get; set; }

        [JsonProperty("ParentID")]
        public string ParentID { get; set; }

        [JsonProperty("Content")]
        public string Content { get; set; }

        [JsonIgnore]
        public int MapId { get; set; }

        [JsonIgnore]
        public Map Map { get; set; }
    }
}
