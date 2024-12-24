using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Model;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {
            
        }

        public DbSet<UserAccount> UserAccounts { get; set; }
        public DbSet<SchoolResource> SchoolResources { get; set; }
        public DbSet<SchoolTask> SchoolTasks { get; set; }


        //Customization
        // protected override void OModelCreating(ModelBuilder modelBuilder)
        // {
        //     base.OnModelCreating(modelBuilder);
        // }
    }
}