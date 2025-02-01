using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.SchoolResource;
using API.Model;

namespace API.Interfaces
{
    public interface ISchoolResourceRepository
    {
        public Task<List<SchoolResource>> GetAllResources();
        public Task<SchoolResource?> GetByIdAsync(int id);
        public Task<SchoolResource> CreateAsync(SchoolResource schoolResource);
        public Task<SchoolResource?> DeleteAsync(int id);
        public Task<SchoolResource?> UpdateAsync(int id, UpdateResourceRequestDto schoolResource);
    }
}