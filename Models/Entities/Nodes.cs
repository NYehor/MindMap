using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Procoder.Models
{
    public class Nodes
    {
        [Column("node_id")]
        public string id { get; set; }
        [Column("pre_node_numb")]
        public string parentId { get; set; }
        [Column("node_content")]
        public string content { get; set; }
        [Column("large_snippet")]
        public List<Snippet> largeSnippets { get; set; }
    }
}
