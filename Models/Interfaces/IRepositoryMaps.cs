using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Procoder.Models
{
    public interface IRepositoryMaps
    {
        ActionResult<IEnumerable<IMapForList>> GetConcreteMap(int mapId);
        JsonResult GetAllMyMaps(int userId);
    }
}
