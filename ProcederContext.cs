using Microsoft.EntityFrameworkCore;
using Procoder.Models;

namespace Procoder
{
    public class ProcederContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Map> Maps { get; set; }
        public DbSet<Nodes> Nodes { get; set; }
        public DbSet<Snippet> Snippets { get; set; }

        public ProcederContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("users");
            modelBuilder.Entity<Map>().ToTable("maps");
            modelBuilder.Entity<Nodes>().ToTable("node_data");

        }
    }
}