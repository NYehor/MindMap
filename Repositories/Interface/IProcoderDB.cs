using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Procoder.Repositories
{
    public interface IProcoderDb
    {
        ProcoderContext context { get; set; }
        IUserRepository UserRepository { get; }
        IMapRepository MapRepository { get; }
        INodeRepository NodeRepository { get; }
        void Save();
    }
}
