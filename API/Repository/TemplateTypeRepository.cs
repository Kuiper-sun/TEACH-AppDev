using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dto.TemplateType;
using API.Interfaces;
using API.Model;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class TemplateTypeRepository : ITemplateTypeRepository
    {

        private readonly ApplicationDbContext _context;
        public TemplateTypeRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<TemplateType> CreateTemplateTypeAsync(TemplateType templateType)
        {
            await _context.TemplateTypes.AddAsync(templateType);
            await _context.SaveChangesAsync();
            return templateType;
        }

        public async Task<TemplateType?> DeleteTemplateTypeAsync(int id)
        {
            var template = await _context.TemplateTypes.FirstOrDefaultAsync(x => x.Id == id);
            if(template == null)
            {
                return null;
            }
            _context.TemplateTypes.Remove(template);
            await _context.SaveChangesAsync();
            return template;
        }

        public async Task<List<TemplateType>> GetAllTemplateTypesAsync()
        {
            return await _context.TemplateTypes
                    .Include(l => l.LessonPlanLayouts)
                    .ToListAsync();
        }

        public async Task<TemplateType?> GetTemplateTypeByIdAsync(int id)
        {
            var templateType = await _context.TemplateTypes
                                .Include(l =>l.LessonPlanLayouts)
                                .FirstOrDefaultAsync(x => x.Id == id);

            if(templateType == null)
            {
                return null;
            }

            return templateType;
        }

        public Task<bool> TemplateTypeExistsAsync(int id)
        {
            return _context.TemplateTypes.AnyAsync(x => x.Id == id);    
        }

        public async Task<TemplateType?> UpdateTemplateTypeAsync(int id, UpdateTemplateRequestDto updateDto)
        {
            var templateModel = await _context.TemplateTypes.FirstOrDefaultAsync(x => x.Id == id);
            Console.WriteLine(templateModel);
            if(templateModel == null)
            {
                Console.WriteLine("Template Type not found");
                return null;
            }

            _context.Entry(templateModel).CurrentValues.SetValues(updateDto);
            await _context.SaveChangesAsync();
            return templateModel;
        }

        
    }
}