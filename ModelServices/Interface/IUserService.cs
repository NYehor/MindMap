using Procoder.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Procoder.ModelServices.Interface
{
    public interface IUserService
    {
        void SignUp(string name, string email, string password);
        UserDto LogInAndTakeUser(string email, string password);
        void SignOut();
    }
}
