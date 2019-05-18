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
        public int UserId { get; set; }
        [Column("user_name")]
        public string Name { get; set; }
        [Column("last_name")]
        public string LastName { get; set; }
        [Column("avatar_img")]
        public string AvatarImg { get; set; }
        [Column("user_mail")]
        public string Email { get; set; }
        [Column("password")]
        public string Password { get; set; }
        //public List<int> mapsId { get; set; }

        [Column("date_registration")]
        public DateTime DateRegistration { get; set; }

        [Column("is_email_valid")]
        public bool IsEmailValid { get; set; }
    }
}
