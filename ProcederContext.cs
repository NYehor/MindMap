using Microsoft.EntityFrameworkCore;
using Procoder.Models;
using Procoder.Models.Entities;

namespace Procoder
{
    public class ProcederContext : DbContext
    {
        public ProcederContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Map> Maps { get; set; }
        public DbSet<NodeData> NodeData { get; set; }
        public DbSet<NodesList> NodesList { get; set; }
        public DbSet<Snippet> Snippets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("users");
            modelBuilder.Entity<Map>().ToTable("maps");
            modelBuilder.Entity<NodeData>().ToTable("nodes_data");
            modelBuilder.Entity<NodesList>().ToTable("nodes_data");
        }
    }
}