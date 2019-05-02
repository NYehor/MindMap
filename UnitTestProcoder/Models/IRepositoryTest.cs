using Procoder.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace UnitTestProcoder.Models
{
    interface IRepositoryTest
    {
        User GetUser(int id);
        bool CreateNewUser(User user);
    }
}
