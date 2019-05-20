using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Procoder.Models;

namespace Procoder.Repositories
{
    public interface IMapRepository: IGenericRepository<Map>
    {
        Map GetById(int mup_id);
        void Delete(int mup_id);
        void Delete(Map map);
        bool IsExist(int mup_id);
    }
}
