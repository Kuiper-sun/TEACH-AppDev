using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dto.SchoolTask;
using API.Dto.UserAccountDto;
using API.Interfaces;
using API.Model;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class SchoolTaskRepository : ISchoolTaskRepository
    {
        private readonly ApplicationDbContext _context;
        public SchoolTaskRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<SchoolTask> CreateAsync(SchoolTask schoolTask)
        {
            await _context.SchoolTasks.AddAsync(schoolTask);
            await _context.SaveChangesAsync();
            return schoolTask;
        }

        public async Task<SchoolTask?> DeleteAsync(int id)
        {
            var schoolTask = await _context.SchoolTasks.FirstOrDefaultAsync(t => t.Id == id);

            if(schoolTask == null)
            {
                return null;
            }

            _context.SchoolTasks.Remove(schoolTask);
            await _context.SaveChangesAsync();
            return schoolTask;
        }

        public async Task<List<SchoolTask>> GetALlTasks()
        {
            return await _context.SchoolTasks.ToListAsync();
        }

        public async Task<SchoolTask?> GetByIdAsync(int id)
        {
            return await _context.SchoolTasks.FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<SchoolTask?> UpdateAsync(int id, UpdateSchoolTaskRequestDto schoolTask)
        {
            var task = await _context.SchoolTasks.FirstOrDefaultAsync(t => t.Id == id);
            if(task == null)
            {
                return null;
            }

            _context.Entry(task).CurrentValues.SetValues(schoolTask);
            await _context.SaveChangesAsync();
            return task;
        }
    }
}