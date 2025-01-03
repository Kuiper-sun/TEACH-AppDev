using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.LessonPlanLayout;
using API.Model;

namespace API.Interfaces
{
    public interface ILessonPlanLayoutRepository
    {
        public Task<List<LessonPlanLayout>> GetAllLessonPlanLayouts();
        public Task<LessonPlanLayout?> GetByIdAsync(int id);
        public Task<LessonPlanLayout> CreateAsync(LessonPlanLayout lessonPlanLayout);
        public Task<LessonPlanLayout?> DeleteAsync(int id);
        public Task<LessonPlanLayout?> UpdateAsync(int id, UpdateLessonPlanRequestDto lessonPlanUpdate);
    }
}