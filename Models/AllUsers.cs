using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Procoder.Models
{
    public class AllUsers
    {
        private List<User> list = new List<User>();

        public List<User> List { get => list; set => list = value; }

        public void Add(User user)
        {

        }
    }
}
