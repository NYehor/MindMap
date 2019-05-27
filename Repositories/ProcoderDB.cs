using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Procoder.Repositories
{
    public class ProcoderDb : IProcoderDb
    {
        public ProcoderContext context { get; set; }

        private IUserRepository userRepository;
        private IMapRepository mapRepository;
        private INodeRepository nodeRepository; 

        public IUserRepository UserRepository { get => userRepository; }
        public IMapRepository MapRepository { get => mapRepository; }
        public INodeRepository NodeRepository { get => nodeRepository; }


        public ProcoderDb(ProcoderContext context)
        {
            this.context = context;
            userRepository = new UserRepository(context);
            mapRepository = new MapRepository(context);
            nodeRepository = new NodeRepository(context);
        }

        public void Save()
        {
            context.SaveChanges();
        }
    }
}
