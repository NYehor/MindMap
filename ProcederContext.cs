using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Procoder.Models;
using Microsoft.Extensions.Configuration;
using System.Configuration;

namespace Procoder
{
    public class ProcederContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public ProcederContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }
    }
}