using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dto.QuarterlyAssessment;
using API.Interfaces;
using API.Model;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class QuarterlyAssessmentRepository : IQuarterlyAssessmentRepository
    {
        private readonly ApplicationDbContext _context;
        public QuarterlyAssessmentRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<QuarterlyAssessment> CreateQuarterlyAssessmentAsync(QuarterlyAssessment qa)
        {
            await _context.QuarterlyAssessments.AddAsync(qa);
            await _context.SaveChangesAsync();
            return qa;
        }

        public async Task<QuarterlyAssessment?> DeleteQuarterlyAssessmentAsync(int id)
        {
            var qa = await _context.QuarterlyAssessments.FirstOrDefaultAsync(x => x.Id == id);
            if(qa == null)
            {
                return null;
            }
            _context.Remove(qa);
            await _context.SaveChangesAsync();
            return qa;
        }

        public async Task<QuarterlyAssessment?> GetQuarterlyAssessmentByIdAsync(int id)
        {
            var qa = await _context.QuarterlyAssessments.FirstOrDefaultAsync(x => x.Id == id);
            if(qa == null)
            {
                return null;
            }

            return qa;
        }

        public async Task<List<QuarterlyAssessment>> GetQuarterlyAssessmentsAsync()
        {
            return await _context.QuarterlyAssessments.ToListAsync();
        }

        public async Task<QuarterlyAssessment?> UpdateQuarterlyAssessmentAsync(int id, UpdateQuarterlyAssessmentDto updateDto)
        {
            var qa = await _context.QuarterlyAssessments.FirstOrDefaultAsync(x => x.Id == id);
            if(qa == null)
            {
                return null;
            }

            _context.Entry(qa).CurrentValues.SetValues(updateDto);
            await _context.SaveChangesAsync();
            return qa;
        }
    }
}