using System.ComponentModel.DataAnnotations.Schema;

namespace Procoder.Models
{
    public class Snippet
    {
        [Column("id")]
        public string id { get; set; }
        [Column("snippet")]
        public string snippet { get; set; }
    }
}