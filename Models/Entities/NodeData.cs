using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Procoder.Models
{
    public class NodeData
    {
        [Column("node_id")]
        public string Id { get; set; }
        [Column("pre_node_numb")]
        public string ParentID { get; set; }
        [Column("node_name")]
        public string Name { get; set; }
        [Column("node_content")]
        public string Content { get; set; }
        [Column("large_snippet")]
        public List<Snippet> LargeSnippet { get; set; }
        [Column("map_id")]
        public int mapId { get; set; }
    }
}
