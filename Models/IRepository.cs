using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Procoder.Models
{
    public interface IRepository
    {
        JsonResult GetUser(int id);
        JsonResult GetAllUser();
    }

    public class Repository : IRepository
    {
        private ProcederContext context;

        public Repository(ProcederContext ctx) => context = ctx;

        public JsonResult GetAllUser()
        {
            var users = context.Users
                .Select(p =>new {Id=p.Id, Name=p.Name, LastName=p.LastName });
            return new JsonResult(users);
        }

        public JsonResult GetUser(int id)
        {
            var user = context.Users
                .Select(p => new
                {
                    Id = p.Id,
                    Name = p.Name,
                    LastName = p.LastName,
                    avatarImgUrl = p.avatarImgUrl,
                    Email = p.Email,
                    Pwd = p.Password
                    //,maps =
                })
                .FirstOrDefault(p => p.Id == id);
            return new JsonResult(user);
        }
    }
}
