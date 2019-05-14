using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Procoder.Models;
using Procoder.ModelsDto;

namespace Procoder
{
    public class MapperModels : Profile
    {
        public MapperModels()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
        }
    }
}
