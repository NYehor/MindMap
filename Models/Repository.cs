using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;


using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Procoder.Controllers.Tools;

namespace Procoder.Models
{

    public class Repository : IRepositoryUsers, IRepositoryMaps
    {
        private ProcederContext context;

        public Repository(ProcederContext ctx) => context = ctx;

        public ActionResult<IEnumerable<Map>> GetAllMyMaps(int userId)
        {
            var map = context.Maps
                .Include(v => v.Id)
                .OrderBy(c => c.Name)
                .Select(p => new { map = p.Name, category = p.Category, create = p.CreateData, edit = p.LastEdit }
                 )
                 .AsEnumerable()
                 .Select(an => new Map
                 {
                     Name = an.map,
                     Category = an.category,
                     CreateData = an.create,
                     LastEdit = an.edit
                 }).ToList();
            return map;
        }

        public ActionResult<Map> GetConcreteMap(int mapId)
        {
            var map = context.Maps
                .Where(v => v.Id == mapId)
                .Select(n => new Map
                {
                    //userId = n.userId,
                    Id = n.Id,
                    Category = n.Category,
                    Status = n.Status,
                    Name = n.Name,
                    CreateData = n.CreateData,
                    LastEdit = n.LastEdit,
                    Nodes = n.Nodes.Select(s => new NodeData
                    {
                        Content = s.Content,
                        Id = s.Id,
                        LargeSnippet = s.LargeSnippet,
                        //ParentID = s.ParentID,
                        Name = s.Name
                        
                    }).Join().ToList()
                })
                .FirstOrDefault();
            //map.Nodes = context.Nodes
            //    .Where(n => n.mapId == mapId)
            //    .Select(s => new Nodes
            //    {
            //        Content = s.Content,
            //        Id = s.Id,
            //        LargeSnippet = s.LargeSnippet,
            //        ParentID = s.ParentID,
            //        Name = s.Name
                    
            //    })
            //    .Include(i=>i.)
            //    .ToList();


            return map;
        }

        public ActionResult<IEnumerable<object>> GetAllUser()
        {
            var users = context.Users
                .OrderBy(o => o.UserId)
                .Select(p => new { p.UserId, p.Name }).ToArray();
            return users;
        }


        //get exist user with password checking
        public ActionResult<bool> GetUser(int id, string password, out User user)
        {
            bool result;
            user = new User();

            string passwordFromDB = context.Users
                .Where(w => id == w.UserId)
                .Select(s => s.Password)
                .FirstOrDefault();

            string inputPasswordHash = PasswordHasher.Hash(password);
            if (PasswordHasher.Verify(password, inputPasswordHash) == true)
            {
                var user1 = context.Users
            .Select(p => new
            {
                p.UserId,
                p.Name,
                p.LastName,
                p.Mail,
            })
            .FirstOrDefault(p => p.UserId == id);

                result = true;

            }
            else
            {
                result = false;
            }
            return result;
        }

        public ActionResult<bool> AddNewUser()
        {
            bool result = false;





            return result;
        }
    }
}
