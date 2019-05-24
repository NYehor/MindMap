using Microsoft.EntityFrameworkCore;
using Procoder.Models;
using System.ComponentModel.DataAnnotations.Schema;

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
            modelBuilder.Entity<Node>().HasKey(c => new { c.Id, c.MapId });
            modelBuilder.Entity<Node>().Property(a => a.Id).ValueGeneratedNever();
            modelBuilder.Entity<Node>().Property(a => a.MapId).ValueGeneratedNever();

            modelBuilder.Entity<User>()
            .HasMany(c => c.Maps)
            .WithOne(e => e.User);

            modelBuilder.Entity<Map>().Property(a => a.UserId).ValueGeneratedNever();
            modelBuilder.Entity<Map>()
                .HasOne(e => e.User)
                .WithMany(c => c.Maps);
        }
    }
}