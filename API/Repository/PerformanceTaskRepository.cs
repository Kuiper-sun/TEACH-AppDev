using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dto.PerformanceTask;
using API.Interfaces;
using API.Model;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class PerformanceTaskRepository : IPerformanceTaskRepository
    {
        private readonly ApplicationDbContext _context;
        public PerformanceTaskRepository(ApplicationDbContext context)
        {   
            _context = context;
        }
        public async Task<PerformanceTask> CreatePtAsync(PerformanceTask pt)
        {
            await _context.PerformanceTasks.AddAsync(pt);
            await _context.SaveChangesAsync();
            return pt;
        }

        public async Task<PerformanceTask?> DeletePtByIdAsync(int id)
        {
            var pt = await _context.PerformanceTasks.FirstOrDefaultAsync(pt => pt.Id == id);

            if(pt == null){return null;}
            _context.Remove(pt);
            await _context.SaveChangesAsync();
            return pt;
        }

        public async Task<List<PerformanceTask>> GetAllPtAsync()
        {
            return await _context.PerformanceTasks.ToListAsync();
        }

        public async Task<PerformanceTask?> GetByPtByIdAsync(int id)
        {
            var pt = await _context.PerformanceTasks.FirstOrDefaultAsync(pt => pt.Id == id);

            if(pt == null){return null;}

            return pt;
        }

        public async Task<PerformanceTask?> UpdatePtByIdAsync(int id, UpdatePerfomanceTaskRequestDto updateDto)
        {
            var pt = await _context.PerformanceTasks.FirstOrDefaultAsync(pt => pt.Id == id);

            if(pt == null){return null;}

            _context.Entry(pt).CurrentValues.SetValues(updateDto);
            await _context.SaveChangesAsync();
            return pt;
        }
    }
}