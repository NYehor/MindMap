using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Procoder.Models
{
    public interface IRepositoryMaps
    {
        JsonResult GetConcreteMap(int mapId);
        JsonResult GetAllMyMaps(int userId);
    }
}
