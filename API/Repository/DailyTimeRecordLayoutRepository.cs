using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dto.DailyTimeRecord;
using API.Interfaces;
using API.Model;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class DailyTimeRecordLayoutRepository : IDailyTimeRecordLayout
    {
        private readonly ApplicationDbContext _context;
        public DailyTimeRecordLayoutRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<DailyTimeRecordLayout> CreateTimeRecordAsync(DailyTimeRecordLayout dailyTimeRecordLayout)
        {
            await _context.DailyTimeRecordLayouts.AddAsync(dailyTimeRecordLayout);
            await _context.SaveChangesAsync();
            return dailyTimeRecordLayout;
        }

        public async Task<DailyTimeRecordLayout?> DeleteTimeRecordAsync(int id)
        {
            var dailyTimeRecord = await _context.DailyTimeRecordLayouts.FirstOrDefaultAsync(x => x.Id == id);
            if(dailyTimeRecord == null)
            {
                return null;
            }
            _context.DailyTimeRecordLayouts.Remove(dailyTimeRecord);
            await _context.SaveChangesAsync();
            return dailyTimeRecord;
        }

        public async Task<List<DailyTimeRecordLayout>> GetDailyTimeRecordAsync()
        {
            return await _context.DailyTimeRecordLayouts.ToListAsync();
        }

        public async Task<DailyTimeRecordLayout?> GetTimeRecordByIdAsync(int id)
        {
            return await _context.DailyTimeRecordLayouts.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<DailyTimeRecordLayout?> UpdateTimeRecordAsync(int id, UpdateDailyTimeRecordRequestDto updateDto)
        {
            var dailyTimeRecord = await _context.DailyTimeRecordLayouts.FirstOrDefaultAsync(x => x.Id == id);
            if(dailyTimeRecord == null)
            {
                return null;
            }
            _context.Entry(dailyTimeRecord).CurrentValues.SetValues(updateDto);
            await _context.SaveChangesAsync();
            return dailyTimeRecord;
        }
    }
}