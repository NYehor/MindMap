using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Procoder.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace Procoder.Repositories
{
    public class MapRepository : GenericRepository<Map>, IMapRepository
    {
        public MapRepository(ProcoderContext context) : base(context) { }

        public void Delete(int id)
        {
            Context.Set<Map>().Remove(GetById(id));
        }

        public void Delete(Map map)
        {
            Context.Set<Map>().Remove(map);
        }

        public Map GetById(int id)
        {
            return Context.Set<Map>()
                .Include(t => t.Nodes)
                .AsNoTracking()
                .FirstOrDefault();
        }

        public List<Map> GetAllMaps(int userId)
        {
            List<Map> maps = Context.Maps
                .Include(t => t.Nodes)
                .OrderBy(c => c.Id)
                .Where(d => d.UserId == userId)
                .ToList();

            return maps;
        }

        public bool IsExist(int Id)
        {
            if (GetById(Id) != null)
                return true;
            else
                return false;
        }
    }
}
