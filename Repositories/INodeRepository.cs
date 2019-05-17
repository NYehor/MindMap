using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Procoder.Models;

namespace Procoder.Repositories
{
    public interface INodeRepository: IGenericRepository<Nodes>
    {
        Nodes GetById(int id);
        void Delete(int id);
    }
}
