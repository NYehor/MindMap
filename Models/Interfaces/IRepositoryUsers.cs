using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Procoder.Models
{
    public interface IRepositoryUsers
    {
        JsonResult GetUser(int id);
        ActionResult<IEnumerable<object>> GetAllUser();
        ActionResult<bool> AddNewUser();
    }
}
