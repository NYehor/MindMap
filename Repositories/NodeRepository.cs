using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Procoder.Models;

namespace Procoder.Repositories
{
    public class NodeRepository: GenericRepository<Node>, INodeRepository
    {
        public NodeRepository(ProcoderContext context) : base(context) { }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Node GetById(string id, string parentId)
        {
            return Context.Set<Node>()
                .AsNoTracking()
                .FirstOrDefault(e => e.Id == id);
        }

        public Node GetById(int id)
        {
            throw new NotImplementedException();
        }
    }
}
