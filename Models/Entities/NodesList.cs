using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Procoder.Models.Entities
{
    public class NodesList
    {
        [Column("cur_node_numb")]
        public string CurrentId { get; set; }
        [Column("pre_node_numb")]
        public string ParentID { get; set; }
        [Column("map_id")]
        public string MapID { get; set; }
    }
}
