using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.WrittenWorks;
using API.Model;

namespace API.Interfaces
{
    public interface IWrittenWorkRepository
    {
        public Task<List<WrittenWork>> GetAllWrittenWorksAsync();

        public Task<WrittenWork?> GetWrittenWorkByIdAsync(int id);

        public Task<WrittenWork> CreateWrittenWorkAsync(WrittenWork writtenWork);

        public Task<WrittenWork?> UpdateWrittenWorkByIdAsync(int id, UpdateWrittenWorksRequestDto updateDto);

        public Task<WrittenWork?> DeleteWrittenWorkByIdAsync(int id);
    }
}