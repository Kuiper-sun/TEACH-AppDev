using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dto.LessonPlanLayout;
using API.Interfaces;
using API.Model;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class LessonPlanLayoutRepository : ILessonPlanLayoutRepository
    {
        private readonly ApplicationDbContext _context;
        public LessonPlanLayoutRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<LessonPlanLayout> CreateAsync(LessonPlanLayout lessonPlanLayout)
        {
            await _context.LessonPlanLayouts.AddAsync(lessonPlanLayout);
            await _context.SaveChangesAsync();
            return lessonPlanLayout;

        }

        public async Task<LessonPlanLayout?> DeleteAsync(int id)
        {
            var lessonPlan = await _context.LessonPlanLayouts.FirstOrDefaultAsync(x => x.Id == id);
            if(lessonPlan == null)
            {
                return null;
            }

            _context.LessonPlanLayouts.Remove(lessonPlan);
            await _context.SaveChangesAsync();
            return lessonPlan;
        }

        public async Task<List<LessonPlanLayout>> GetAllLessonPlanLayouts()
        {
            return await _context.LessonPlanLayouts.ToListAsync();
        }

        public async Task<LessonPlanLayout?> GetByIdAsync(int id)
        {
            return await _context.LessonPlanLayouts.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<LessonPlanLayout?> UpdateAsync(int id, UpdateLessonPlanRequestDto lessonPlanUpdate)
        {
            var lessonPlan = await _context.LessonPlanLayouts.FirstOrDefaultAsync(x => x.Id == id);

            if(lessonPlan == null)
            {
                return null;
            }

            _context.Entry(lessonPlan).CurrentValues.SetValues(lessonPlanUpdate);
            await _context.SaveChangesAsync();
            return lessonPlan;
        }
    }
}