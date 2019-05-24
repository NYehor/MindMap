using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Procoder.Models;

namespace Procoder.Repositories
{
    public interface IUserRepository: IGenericRepository<User>
    {
        bool VerefiPassword(string password);
        bool IsExist(string email);
        bool IsExist(int id);
        User GetByEmail(string email);
        User GetById(int id);
        User Authenticate(string email, string password);
    }
}
