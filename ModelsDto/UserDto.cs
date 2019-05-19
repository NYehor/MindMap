using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Procoder.ModelsDto
{
    public class UserDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string AvatarImg { get; set; }


        public int UserId { get; set; }
        public string Name { get; set; }


        //public List<int> mapsId { get; set; }


        public DateTime DateRegistration { get; set; }


    }
}
