using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dto.WrittenWorks;
using API.Interfaces;
using API.Model;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class WrittenWorksRepository : IWrittenWorkRepository
    {
        private readonly ApplicationDbContext _context;
        public WrittenWorksRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<WrittenWork> CreateWrittenWorkAsync(WrittenWork writtenWork)
        {
            await _context.WrittenWorks.AddAsync(writtenWork);
            await _context.SaveChangesAsync();
            return writtenWork;
        }

        public Task<WrittenWork?> DeleteWrittenWorkByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<WrittenWork>> GetAllWrittenWorksAsync()
        {
            return await _context.WrittenWorks.ToListAsync();
        }

        public async Task<WrittenWork?> GetWrittenWorkByIdAsync(int id)
        {
            var writtenWork = await _context.WrittenWorks.FirstOrDefaultAsync(x => x.Id == id);
            if(writtenWork == null)
            {
                return null;
            }

            return writtenWork;
        }

        public async Task<WrittenWork?> UpdateWrittenWorkByIdAsync(int id, UpdateWrittenWorksRequestDto updateDto)
        {
            var writtenWork = await _context.WrittenWorks.FirstOrDefaultAsync(x => x.Id == id);
            if(writtenWork == null)
            {
                return null;
            }

            _context.Entry(writtenWork).CurrentValues.SetValues(updateDto);
            await _context.SaveChangesAsync();
            return writtenWork;
        }
    }
}