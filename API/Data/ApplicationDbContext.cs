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
        public DbSet<TemplateType> TemplateTypes { get; set; }
        public DbSet<LessonPlanLayout> LessonPlanLayouts { get; set; }
        public DbSet<DailyLessonLogLayout> DailyLessonLogLayouts { get; set; }
        public DbSet<DailyTimeRecordLayout> DailyTimeRecordLayouts { get; set; }

        //Customization
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // UserAccount -> SchoolResource, SchoolTask
            modelBuilder.Entity<UserAccount>()
            .HasMany(u => u.SchoolResources)
            .WithOne(r => r.UserAccount)
            .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<UserAccount>()
            .HasMany(u => u.SchoolTasks)
            .WithOne(t => t.UserAccount)
            .OnDelete(DeleteBehavior.Cascade);

            // TemplateType -> LessonPlanLayout, DailyLessonLogLayout, DailyTimeRecordLayout
            modelBuilder.Entity<TemplateType>()
            .HasMany(t => t.LessonPlanLayouts)
            .WithOne(l => l.TemplateType)
            .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<TemplateType>()
            .HasMany(t => t.DailyLessonLogLayouts)
            .WithOne(l => l.TemplateType)
            .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<TemplateType>()
            .HasMany(t => t.DailyTimeRecordLayouts)
            .WithOne(l => l.TemplateType)
            .OnDelete(DeleteBehavior.Cascade);

        }
    }
}