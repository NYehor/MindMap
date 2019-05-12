using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Procoder.Models
{
    [Serializable]
    public class User
    {
        [Column("id")]
        public int userId { get; set; }
        public string user_name { get; set; }
        public string last_name { get; set; }

        public string avatar_img_url { get; set; }
        public string user_mail { get; set; }
        public string password { get; set; }
        //public List<int> mapsId { get; set; }
    }
}
