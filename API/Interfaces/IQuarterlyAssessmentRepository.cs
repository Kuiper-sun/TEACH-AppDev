using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.QuarterlyAssessment;
using API.Model;

namespace API.Interfaces
{
    public interface IQuarterlyAssessmentRepository
    {
        public Task<List<QuarterlyAssessment>> GetQuarterlyAssessmentsAsync();

        public Task<QuarterlyAssessment?> GetQuarterlyAssessmentByIdAsync(int id);

        public Task<QuarterlyAssessment> CreateQuarterlyAssessmentAsync(QuarterlyAssessment qa);

        public Task<QuarterlyAssessment?> UpdateQuarterlyAssessmentAsync(int id, UpdateQuarterlyAssessmentDto updateDto);

        public Task<QuarterlyAssessment?> DeleteQuarterlyAssessmentAsync(int id);
    }
}