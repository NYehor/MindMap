using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Procoder.Models;

namespace Procoder.Repositories
{
    public class SnippetRepository : GenericRepository<Snippet>, ISnippetRepository
    {
        public SnippetRepository(ProcoderContext context) : base(context) { }

        public Snippet GetById(string id)
        {
            throw new NotImplementedException();
        }
    }
}
