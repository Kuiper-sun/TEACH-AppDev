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


        //Join Table
        public DbSet<UserTemplateJoin> UserTemplateJoins { get; set; }

        //Main Tables
        public DbSet<UserAccount> UserAccounts { get; set; }
        public DbSet<SchoolResource> SchoolResources { get; set; }
        public DbSet<SchoolTask> SchoolTasks { get; set; }
        public DbSet<TemplateType> TemplateTypes { get; set; }
        public DbSet<LessonPlanLayout> LessonPlanLayouts { get; set; }
        public DbSet<DailyLessonLogLayout> DailyLessonLogLayouts { get; set; }
        public DbSet<DailyTimeRecordLayout> DailyTimeRecordLayouts { get; set; }

        public DbSet<Student> Students {get; set;}
        public DbSet<PerformanceTask> PerformanceTasks {get; set;}
        public DbSet<WrittenWork> WrittenWorks {get; set;}
        public DbSet<QuarterlyAssessment> QuarterlyAssessments {get; set;}
        //Customization
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {   
            base.OnModelCreating(modelBuilder);

            // UserTemplateJoin -> UserAccount, TemplateType
            modelBuilder.Entity<UserTemplateJoin>(x => x.HasKey(p => new { p.UserId, p.TemplateId }));

            modelBuilder.Entity<UserTemplateJoin>()
             .HasOne(u => u.UserAccount)
             .WithMany(t => t.UserTemplateJoins)
             .HasForeignKey(u => u.UserId);

            modelBuilder.Entity<UserTemplateJoin>()
             .HasOne(u => u.templateType)
             .WithMany(t => t.UserTemplateJoins)
             .HasForeignKey(u => u.TemplateId);


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