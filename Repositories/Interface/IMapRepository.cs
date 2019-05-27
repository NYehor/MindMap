using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Procoder.Models;

namespace Procoder.Repositories
{
    public interface IMapRepository: IGenericRepository<Map>
    {
        ICollection<Map> GetUserMapsByCategory(int userId, string category);
        ICollection<Map> GetUserMapsByStatus(int userId, string status);
        ICollection<Map> GetAllMaps(int userId);
        Map GetById(int mup_id);
        void Delete(int user_id, int mup_id);
        void Delete(Map map);
        bool IsExist(int mup_id);
    }
}
