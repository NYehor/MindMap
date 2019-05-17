using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Procoder.Models
{
    public class Nodes
    {
        [JsonProperty("Id")]
        [Column("node_id")]
        public string Id { get; set; }

        [JsonProperty("ParentID")]
        [Column("pre_node_numb")]
        public string ParentID { get; set; }

        [JsonProperty("Content")]
        [Column("node_content")]
        public string Content { get; set; }

        [JsonProperty("LargeSnippet", NullValueHandling = NullValueHandling.Ignore)]
        [Column("large_snippet")]
        public List<Snippet> LargeSnippet { get; set; }
    }
}
