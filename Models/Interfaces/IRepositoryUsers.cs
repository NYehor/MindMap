using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Procoder.Models
{
    public interface IRepositoryUsers
    {
        ActionResult<bool> GetUser(int id, string password, out User user);
        ActionResult<IEnumerable<object>> GetAllUser();
        ActionResult<bool> AddNewUser();
    }
}
