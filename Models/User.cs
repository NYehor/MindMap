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

        public int Id { get; set; }

        public string Name { get; set; }

        public string LastName { get; set; }

        public string AvatarImg { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public List<Map> Maps { get; set; }

        public DateTime DateRegistration { get; set; }

        public bool IsEmailValid { get; set; }
    }
}
