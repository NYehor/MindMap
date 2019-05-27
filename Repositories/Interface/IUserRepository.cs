using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Procoder.Models;

namespace Procoder.Repositories
{
    public interface IUserRepository: IGenericRepository<User>
    {
        bool IsExist(string email);
        bool IsExist(int id);
        User GetByEmail(string email);
        User GetById(int id);
    }
}
