using Microsoft.EntityFrameworkCore;
using Procoder.Models;

namespace Procoder
{
    public class ProcoderContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Map> Maps { get; set; }
        public DbSet<Node> Nodes { get; set; }

        public ProcoderContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(e =>
            {
                 e.HasIndex(p => new { p.Id })
                    .IsUnique();

                e.HasIndex(p => p.Email)
                    .IsUnique();

                e.Property(p => p.Email)
                    .IsRequired()
                    .HasColumnType("varchar(64)");

                e.Property(p => p.Password)
                    .HasColumnType("varchar(64)");
            });

            modelBuilder.Entity<Map>(e =>
            {
                e.HasIndex(p => new { p.Id })
                   .IsUnique();
            });

            modelBuilder.Entity<Node>(e =>
            {
                e.HasKey(p => new { p.Id, p.MapId });

                e.Property(p => p.Id)
                    .IsRequired()
                    .HasColumnType("varchar(64)");
            });
              
        }
    }
}