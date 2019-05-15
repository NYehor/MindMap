using System.ComponentModel.DataAnnotations.Schema;

namespace Procoder.Models
{
    public class Snippet
    {
        [Column("id")]
        public string Id { get; set; }
        [Column("snippet")]
        public string Snip { get; set; }
    }
}