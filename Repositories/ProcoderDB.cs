﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Procoder.Repositories
{
    public class ProcoderDB : IProcoderDB
    {
        private ProcoderContext context;

        private IUserRepository userRepository;
        private IMapRepository mapRepository;
        private INodeRepository nodeRepository; 
        private ISnippetRepository snippetRepository;

        public IUserRepository UserRepository { get => userRepository; }
        public IMapRepository MapRepository { get => mapRepository; }
        public INodeRepository NodeRepository { get => nodeRepository; }
        public ISnippetRepository SnippetRepository { get => snippetRepository; }


        public ProcoderDB(ProcoderContext context)
        {
            this.context = context;
            userRepository = new UserRepository(context);
            mapRepository = new MapRepository(context);
            snippetRepository = new SnippetRepository(context);
            nodeRepository = new NodeRepository(context);
        }

        public void Save()
        {
            context.SaveChanges();
        }
    }
}