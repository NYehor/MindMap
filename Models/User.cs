using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Procoder.Models
{
    [Serializable]
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }

        public string avatarImgUrl { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public List<int> mapsId { get; set; }
    }
}
