using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.PerformanceTask;
using API.Model;

namespace API.Interfaces
{
    public interface IPerformanceTaskRepository
    {
        public Task<List<PerformanceTask>> GetAllPtAsync();
        public Task<PerformanceTask?> GetByPtByIdAsync(int id);

        public Task<PerformanceTask?> DeletePtByIdAsync(int id);
        public Task<PerformanceTask> CreatePtAsync(PerformanceTask pt);
        public Task<PerformanceTask?> UpdatePtByIdAsync(int id, UpdatePerfomanceTaskRequestDto updateDto); 
    }
}