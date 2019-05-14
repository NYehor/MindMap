using Microsoft.AspNetCore.Mvc;

namespace Procoder.Models
{
    public interface IRepositoryUsers
    {
        JsonResult GetUser(int id);
        JsonResult GetAllUser();
    }
}
