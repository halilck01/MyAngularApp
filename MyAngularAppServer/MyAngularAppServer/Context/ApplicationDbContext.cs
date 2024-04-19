using ForcegetTaskServer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ForcegetTaskServer.Context
{
    public sealed class ApplicationDbContext : IdentityDbContext<AppUser, AppRole, Guid>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<CountryCity> CountriesCities { get; set; }
        public DbSet<Currency> Currencies { get; set; }
        public DbSet<Incoterm> Incoterms { get; set; }
        public DbSet<Mode> Modes { get; set; }
        public DbSet<MovementType> MovementTypes { get; set; }
        public DbSet<PackageType> PackageTypes { get; set; }
        public DbSet<Shipment> Shipments { get; set; }
        public DbSet<Unit1> Unit1s { get; set; }
        public DbSet<Unit2> Unit2s { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Ignore<IdentityRoleClaim<Guid>>();   
            modelBuilder.Ignore<IdentityUserClaim<Guid>>();   
            modelBuilder.Ignore<IdentityUserLogin<Guid>>();   
            modelBuilder.Ignore<IdentityUserToken<Guid>>();   
            modelBuilder.Ignore<IdentityUserRole<Guid>>();   
        }
    }
}


