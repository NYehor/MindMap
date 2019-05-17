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
                .AsNoTracking()
                .FirstOrDefault();
        }

        public JsonResult GetAllMyMaps(int userId)
        {
            IEnumerable<object> map = Context.Maps
                 .OrderBy(c => c.Id)
                 .Where(d => d.userId == userId)
                 .Select(p => new { map = p.Name, category = p.Category, create = p.CreateData, edit = p.LastEdit }
                 )
                 .AsEnumerable()
                 .Select(an => new
                 {
                     name = an.map,
                     category = an.category,
                     CreateData = an.create,
                     LastEdit = an.edit
                 });
            return new JsonResult(map);
        }
    }
}
