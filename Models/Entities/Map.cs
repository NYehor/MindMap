using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Procoder.Models
{
    [Serializable]
   
    public class Map : IMap
    {
        [Column("user_id")]
        public int userId { get; set; }
        [Column("map_id")]
        public int Id { get; set; }
        [Column("map_category")]
        public string Category { get; set; }
        [Column("status")]
        public int Status { get; set; }
        [Column("map_name")]
        public string Name { get; set; }
        [Column("create_data")]
        public DateTime CreateData { get; set; }
        [Column("last_edit")]
        public DateTime LastEdit { get; set; }
        public List<NodeData> Nodes { get; set; }
    }

    interface IMap : IMapForList
    {
        int userId { get; set; }
        //mapId
        int Id { get; set; }
    }

}

