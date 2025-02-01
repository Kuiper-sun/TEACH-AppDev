using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.TemplateType;
using API.Model;

namespace API.Interfaces
{
    public interface ITemplateTypeRepository
    {
        public Task<List<TemplateType>> GetAllTemplateTypesAsync();
        public Task<TemplateType?> GetTemplateTypeByIdAsync(int id);
        public Task<TemplateType> CreateTemplateTypeAsync(TemplateType templateType);

        public Task<TemplateType?> UpdateTemplateTypeAsync(int id, UpdateTemplateRequestDto updateDto);
        public Task<TemplateType?> DeleteTemplateTypeAsync(int id);
        public Task<bool> TemplateTypeExistsAsync(int id);
    }
}