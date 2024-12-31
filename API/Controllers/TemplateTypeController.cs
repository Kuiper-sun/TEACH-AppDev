using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.TemplateType;
using API.Interfaces;
using API.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/TemplateType")]
    public class TemplateTypeController : ControllerBase
    {
        private readonly ITemplateTypeRepository _templateTypeRepository;

        public TemplateTypeController(ITemplateTypeRepository templateTypeRepository)
        {
            _templateTypeRepository = templateTypeRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTemplateTypes()
        {
            var templateTypes = await _templateTypeRepository.GetAllTemplateTypesAsync();
            var templateDto = templateTypes.Select(u => u.ToTemplateDto());
            return Ok(templateDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTemplateTypeById(int id)
        {
            var templateType = await _templateTypeRepository.GetTemplateTypeByIdAsync(id);

            if(templateType == null)
            {
                return NotFound();
            }

            return Ok(templateType);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteTemplateType([FromRoute] int id)
        {
            var templateType = await _templateTypeRepository.DeleteTemplateTypeAsync(id);

            if(templateType == null)
            {
                return NotFound();
            }

            return NoContent();
        }
        
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTemplateRequestDto createTemplateDto)
        {
            var templateType = createTemplateDto.ToTemplateTypeFromCreateTemplateRequestDto();
            await _templateTypeRepository.CreateTemplateTypeAsync(templateType);
            return CreatedAtAction(nameof(GetTemplateTypeById), new{id = templateType.Id}, templateType.ToTemplateDto());
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateTemplateRequestDto updateDto)
        {
            var templateModel = await _templateTypeRepository.UpdateTemplateTypeAsync(id, updateDto);
            
            if(templateModel == null)
            {
                return NotFound();
            }

            return Ok(templateModel);
        }
    }
}