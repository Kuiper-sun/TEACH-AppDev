using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.SchoolTask;
using API.Dto.UserAccountDto;
using API.Model;

namespace API.Interfaces
{
    public interface ISchoolTaskRepository
    {
        public Task<List<SchoolTask>> GetALlTasks();
        public Task<SchoolTask?> GetByIdAsync(int id);

        public Task<SchoolTask> CreateAsync(SchoolTask schoolTask);

        public Task<SchoolTask?> DeleteAsync(int id);  

        public Task<SchoolTask?> UpdateAsync(int id, UpdateSchoolTaskRequestDto schoolTask);
    }
}