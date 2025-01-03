using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.LessonPlanLayout;
using API.Interfaces;
using API.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/LessonPlanLayout")]
    public class LessonPlanLayoutController : ControllerBase
    {
        private readonly ILessonPlanLayoutRepository _lessonPlanLayoutRepo;
        private readonly ITemplateTypeRepository _templateTypeRepo;
        public LessonPlanLayoutController(ILessonPlanLayoutRepository lessonPlanLayoutRepo, ITemplateTypeRepository templateTypeRepo)
        {
            _lessonPlanLayoutRepo = lessonPlanLayoutRepo;
            _templateTypeRepo = templateTypeRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllLessonPlanLayouts()
        {
            var lessonPlanLayouts = await _lessonPlanLayoutRepo.GetAllLessonPlanLayouts();
            var lessonPlanLayoutsDto = lessonPlanLayouts.Select(lessonPlan => lessonPlan.tolessonPlanDto());
            return Ok(lessonPlanLayoutsDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var lessonPlan = await _lessonPlanLayoutRepo.GetByIdAsync(id);
            if(lessonPlan == null)
            {
                return NotFound();
            }
            return Ok(lessonPlan.tolessonPlanDto());
        }

        [HttpPost]
        [Route("{TemplateId}")]
        public async Task<IActionResult> CreateLessonPlan([FromBody] CreateLessonPlanRequestDto lessonPlan, [FromRoute] int TemplateId)
        {
            if(!await _templateTypeRepo.TemplateTypeExistsAsync(TemplateId))
            {
                return BadRequest("Template not found");
            }

            var newLessonPlan = lessonPlan.ToLessonPlanFromCreateDto(TemplateId);
            await _lessonPlanLayoutRepo.CreateAsync(newLessonPlan);
            return CreatedAtAction(nameof(GetById), new { id = newLessonPlan.Id }, newLessonPlan.tolessonPlanDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteById([FromRoute] int id)
        {
            var lessonPlan = await _lessonPlanLayoutRepo.DeleteAsync(id);
            if(lessonPlan == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateLessonPlan([FromRoute] int id, [FromBody] UpdateLessonPlanRequestDto lessonPlanUpdate)
        {
            var lessonPlan = await _lessonPlanLayoutRepo.UpdateAsync(id, lessonPlanUpdate);
            if(lessonPlan == null)
            {
                return NotFound();
            }

            return Ok(lessonPlan.tolessonPlanDto());
        }
    }
}