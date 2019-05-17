using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace Procoder.Models
{
    public class Snippet
    {
        [JsonProperty("Id")]
        [Column("id")]
        public string Id { get; set; }
        [JsonProperty("Snip")]
        [Column("snippet")]
        public string Snip { get; set; }
    }
}