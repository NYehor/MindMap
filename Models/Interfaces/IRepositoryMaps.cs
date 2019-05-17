using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Procoder.Models
{
    public interface IRepositoryMaps
    {
        ActionResult<Map> GetConcreteMap(int mapId);
        ActionResult<IEnumerable<Map>> GetAllMyMaps(int userId);
    }
}
