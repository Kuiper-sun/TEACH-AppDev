using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Interfaces;
using API.Model;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class UserTemplateJoinRepository : IUserTemplateJoin
    {
        private readonly ApplicationDbContext _context;
        public UserTemplateJoinRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<UserTemplateJoin> CreateUserDataAsync(UserTemplateJoin userData)
        {
            await _context.UserTemplateJoins.AddAsync(userData);
            await _context.SaveChangesAsync();
            return userData;
        }

        public async Task<UserTemplateJoin> DeleteDataAsync(UserAccount user, int templateId)
        {
            var userData = await _context.UserTemplateJoins.FirstOrDefaultAsync(x => x.UserId == user.Id && x.TemplateId == templateId);
            if(userData == null)
            {
                return null;
            }

            _context.UserTemplateJoins.Remove(userData);
            await _context.SaveChangesAsync();
            return userData;
        }

        public async Task<List<TemplateType>> GetUserData(UserAccount user)
        {
            return await _context.UserTemplateJoins.Where(u => u.UserId == user.Id)
                .Select(template => new TemplateType
                {
                    Id = template.TemplateId,
                    TemplateName = template.templateType.TemplateName,
                    LessonPlanLayouts = template.templateType.LessonPlanLayouts,
                    DailyLessonLogLayouts = template.templateType.DailyLessonLogLayouts,
                    DailyTimeRecordLayouts = template.templateType.DailyTimeRecordLayouts
                }).ToListAsync();
        }
    }
}