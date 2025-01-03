using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.DailyTimeRecord;
using API.Model;

namespace API.Interfaces
{
    public interface IDailyTimeRecordLayout
    {
        public Task<List<DailyTimeRecordLayout>> GetDailyTimeRecordAsync();
        public Task<DailyTimeRecordLayout?> GetTimeRecordByIdAsync(int id);
        public Task<DailyTimeRecordLayout> CreateTimeRecordAsync(DailyTimeRecordLayout dailyTimeRecordLayout);
        public Task<DailyTimeRecordLayout?> DeleteTimeRecordAsync(int id);

        public Task<DailyTimeRecordLayout?> UpdateTimeRecordAsync(int id, UpdateDailyTimeRecordRequestDto updateDto);
    }
}