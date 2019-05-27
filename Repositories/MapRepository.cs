﻿using System;
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
            Context.Maps.Remove(GetById(mup_id));
        }

        public void Delete(Map map)
        {
            Context.Set<Map>().Remove(map);
        }

        public Map GetById(int mup_id)
        {
            var tmp = Context.Maps
                .Include(t => t.Nodes)
                .AsNoTracking()
                .FirstOrDefault(e => e.Id == mup_id);

            return tmp;
        }

        public ICollection<Map> GetAllMaps(int userId)
        {
            return Context.Maps
                .Where(d => d.UserId == userId)
                .Include(t => t.Nodes)
                .OrderBy(c => c.Id)
                .ToList();
        }

        public bool IsExist(int mup_id)
        {
            if (GetById(mup_id) != null)
                return true;
            else
                return false;
        }

        public ICollection<Map> GetUserMapsByStatus(int userId, string status)
        {
            return Context.Maps
                .Where(d => d.UserId == userId && d.Status == status)
                .ToList();
        }

        public ICollection<Map> GetUserMapsByCategory(int userId, string category)
        {
            return Context.Maps
                .Where(d => d.UserId == userId && d.Category == category)
                .ToList();
        }
    }
}
