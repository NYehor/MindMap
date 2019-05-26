using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Procoder.Models;
using Microsoft.EntityFrameworkCore;

namespace Procoder.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(ProcoderContext context) : base(context) { }

        public User GetByEmail(string email)
        {
            return Context.Users
                .Include(t => t.Maps)
                .AsNoTracking()
                .FirstOrDefault(e => e.Email == email);
        }

        public User GetById(int id)
        {
            return Context.Users
                .Include(t => t.Maps)
                .AsNoTracking()
                .FirstOrDefault(e => e.Id == id);
        }

        public bool IsExist(string email)
        {
            if (GetByEmail(email) != null)
                return true;
            else
                return false;
        }

        public bool IsExist(int id)
        {
            if (GetById(id) != null)
                return true;
            else
                return false;
        }
    }
}
