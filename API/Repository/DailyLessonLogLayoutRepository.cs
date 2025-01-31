using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dto.DailyLessonLog;
using API.Interfaces;
using API.Model;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class DailyLessonLogLayoutRepository : IDailyLessonLogLayoutRepository
    {
        private readonly ApplicationDbContext _context;
        public DailyLessonLogLayoutRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<DailyLessonLogLayout> CreateAsync(DailyLessonLogLayout dailyLessonLogLayout)
        {
            await _context.DailyLessonLogLayouts.AddAsync(dailyLessonLogLayout);
            await _context.SaveChangesAsync();
            return dailyLessonLogLayout;
        }

        public async Task<DailyLessonLogLayout?> DeleteAsync(int id)
        {
            var lessonLog = await _context.DailyLessonLogLayouts.FirstOrDefaultAsync(x => x.Id == id);
            if(lessonLog == null)
            {
                return null;
            }

            _context.DailyLessonLogLayouts.Remove(lessonLog);
            await _context.SaveChangesAsync();
            return lessonLog;
        }

        public async Task<List<DailyLessonLogLayout>> GetAllAsync()
        {
            return await _context.DailyLessonLogLayouts.ToListAsync();
        }

        public async Task<DailyLessonLogLayout?> GetByIdAsync(int id)
        {
            return await _context.DailyLessonLogLayouts.FirstOrDefaultAsync(x => x.Id == id);
        }

        

        public async Task<DailyLessonLogLayout?> UpdateAsync(int id, UpdateLessonLogRequestDto updateLessonLogRequestDto)
        {
            var lessonLog = await _context.DailyLessonLogLayouts.FirstOrDefaultAsync(x => x.Id == id);
            if(lessonLog == null)
            {
                return null;
            }
            _context.Entry(lessonLog).CurrentValues.SetValues(updateLessonLogRequestDto);
            await _context.SaveChangesAsync();
            return lessonLog;
        }

        public async Task<List<LessonLogContentDto>> GetUserLessonLog(int userId, int templateId)
        {
            var lessonLogData = await _context.DailyLessonLogLayouts
                                              .Join(
                                                _context.UserTemplateJoins.Where(utj => utj.UserId == userId && utj.TemplateId == templateId),
                                                lg => lg.TemplateTypeId,
                                                utj => utj.TemplateId,
                                                (lg, utj) => lg
                                              )
                                              .Select(lg => new LessonLogContentDto
                                              {
                                                GradeLevel = lg.GradeLevel,
                                                Subject = lg.Subject,
                                                Activities = lg.Activities,
                                                Materials = lg.Materials,
                                                Reflection = lg.Reflection,
                                                Date = lg.Date,
                                                DayOfWeek = lg.DayOfWeek
                                              })
                                              .ToListAsync();
            

            if(lessonLogData == null)
            {   
                return null;
            }
            return lessonLogData;
                                            
        }
    }
}