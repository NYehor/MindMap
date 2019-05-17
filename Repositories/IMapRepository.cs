using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Procoder.Models;

namespace Procoder.Repositories
{
    public interface IMapRepository: IGenericRepository<Map>
    {
        Map GetById(int id);
        void Delete(int id);
        void Delete(Map map);
    }
}
