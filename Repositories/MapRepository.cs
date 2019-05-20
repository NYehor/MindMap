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

        public void Delete(int user_id, int mup_id)
        {
            var user = Context.Users.Include(p => p.Maps)
                .SingleOrDefault(p => p.Id == user_id);

            foreach (var map in user.Maps.ToList())
            {
                if (map.UserId == mup_id)
                   if(user.Maps.Remove(map))
                        Context.Users.Update(user);
            }
        }

        public void Delete(Map map)
        {
            Context.Set<Map>().Remove(map);
        }

        public Map GetById(int mup_id)
        {
            var tmp = Context.Maps
                .AsNoTracking()
                .FirstOrDefault(e => e.Id == mup_id);

            return tmp;
        }

        public List<Map> GetAllMaps(int userId)
        {
            List<Map> maps = Context.Maps
                .Where(d => d.UserId == userId)
                .Include(t => t.Nodes)
                .OrderBy(c => c.Id)
                .ToList();

            return maps;
        }

        public bool IsExist (int mup_id)
        {
            if (GetById(mup_id) != null)
                return true;
            else
                return false;
        }
    }
}
