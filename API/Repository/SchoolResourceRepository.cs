using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dto.SchoolResource;
using API.Interfaces;
using API.Model;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class SchoolResourceRepository : ISchoolResourceRepository
    {

        private readonly ApplicationDbContext _context;
        public SchoolResourceRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        
        public async Task<SchoolResource> CreateAsync(SchoolResource schoolResource)
        {
            await _context.SchoolResources.AddAsync(schoolResource);
            await _context.SaveChangesAsync();
            return schoolResource;
        }

        public async Task<SchoolResource?> DeleteAsync(int id)
        {
            var schoolResource = await _context.SchoolResources.FirstOrDefaultAsync(x => x.Id == id);
            
            if(schoolResource == null)
            {
                return null;
            }

            _context.SchoolResources.Remove(schoolResource);
            await _context.SaveChangesAsync();
            return schoolResource;
        }

        public async Task<List<SchoolResource>> GetAllResources()
        {
            return await _context.SchoolResources.ToListAsync();
        }

        public async Task<SchoolResource?> GetByIdAsync(int id)
        {
            return await _context.SchoolResources.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<SchoolResource?> UpdateAsync(int id, UpdateResourceRequestDto schoolResourceDto)
        {
            var resource = await _context.SchoolResources.FirstOrDefaultAsync(x => x.Id == id);

            if(resource == null)
            {
                return null;
            }

            _context.Entry(resource).CurrentValues.SetValues(schoolResourceDto);
            await _context.SaveChangesAsync();
            return resource;
        }
    }
}