using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Procoder.Repositories
{
    public interface IProcoderDB
    {
        ProcoderContext context { get; set; }
        IUserRepository UserRepository { get; }
        IMapRepository MapRepository { get; }
        INodeRepository NodeRepository { get; }
        void Save();
    }
}
