using System;
using System.Collections.Generic;
using System.Linq;


using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Procoder.Models
{

    public class Repository : IRepositoryUsers, IRepositoryMaps
    {
        private ProcederContext context;

        public Repository(ProcederContext ctx) => context = ctx;

        public JsonResult GetAllMyMaps(int userId)
        {
            IEnumerable<object> map = context.Maps
                 .OrderBy(c => c.id)
                 .Where(d => d.userId == userId)
                 .Select(p => new { map = p.name, category = p.category, create = p.CreateData, edit = p.LastEdit }
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

        public JsonResult GetConcreteMap(int mapId)
        {
            var map = context.Maps
                 .Where(v => v.id == mapId)
                 .Select(n => new Map
                 {
                     userId = n.userId,
                     id = n.id,
                     category = n.category,
                     status = n.status,
                     name = n.name,
                     CreateData = n.CreateData,
                     LastEdit = n.LastEdit
                 })
                 //continue here
                                     .Include(c => c.Nodes);
            return new JsonResult(map);
        }

        public JsonResult GetAllUser()
        {
            var users = context.Users
                .OrderBy(o => o.UserId)
               .Select(p => new { p.userId });
            return new JsonResult(users);
        }

        public JsonResult GetUser(int id)
        {

            var user = context.Users
            .Select(p => new
            {
                p.userId,
                p.user_name,
                p.last_name,
                p.user_mail,
                p.password
            })
            .Where(p => id == p.userId)
            .ToList();
            //.FirstOrDefault(p => p.userId == id);
            return new JsonResult(user);

        }
    }
}
