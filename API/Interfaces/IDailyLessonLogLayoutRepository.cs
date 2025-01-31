using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.DailyLessonLog;
using API.Model;

namespace API.Interfaces
{
    public interface IDailyLessonLogLayoutRepository
    {
        public Task<List<DailyLessonLogLayout>> GetAllAsync();
        public Task<DailyLessonLogLayout?> GetByIdAsync (int id);

        public Task<DailyLessonLogLayout> CreateAsync(DailyLessonLogLayout dailyLessonLogLayout);

        public Task<DailyLessonLogLayout?> DeleteAsync(int id);
        

        //Implement later when DTO is created
        public Task<DailyLessonLogLayout?> UpdateAsync(int id, UpdateLessonLogRequestDto updateLessonLogRequestDto);

        public Task<List<LessonLogContentDto>> GetUserLessonLog(int userId, int templateId);
    }
}