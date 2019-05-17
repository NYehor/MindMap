using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Procoder.Models;

namespace Procoder.Repositories
{
    public class NodeRepository: GenericRepository<Nodes>, INodeRepository
    {
        public NodeRepository(ProcoderContext context) : base(context) { }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Nodes GetById(string id, string parentId)
        {
            return Context.Set<Nodes>()
                .AsNoTracking()
                .FirstOrDefault(e => e.Id == id);
        }

        public Nodes GetById(int id)
        {
            throw new NotImplementedException();
        }
    }
}
