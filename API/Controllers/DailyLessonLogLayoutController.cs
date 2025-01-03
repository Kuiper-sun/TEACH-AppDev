using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.DailyLessonLog;
using API.Interfaces;
using API.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/LessonLog")]
    public class DailyLessonLogLayoutController : ControllerBase
    {
        private readonly IDailyLessonLogLayoutRepository _dailyLessonLogLayoutRepo;
        private readonly ITemplateTypeRepository _templateTypeRepo;

        public DailyLessonLogLayoutController(IDailyLessonLogLayoutRepository dailyLessonLogLayoutRepo, ITemplateTypeRepository templateTypeRepo)
        {
            _dailyLessonLogLayoutRepo = dailyLessonLogLayoutRepo;
            _templateTypeRepo = templateTypeRepo;
        }

        [HttpGet]
        // GET: api/LessonLog
        public async Task<IActionResult> GetDailyLessonLogLayout()
        {
            var dailyLessonLogLayout = await _dailyLessonLogLayoutRepo.GetAllAsync();
            var lessonLogDto = dailyLessonLogLayout.Select(dailyLessonLogLayout => dailyLessonLogLayout.ToLessonLogDto());
            return Ok(lessonLogDto);
        }

        [HttpGet("{id}")]
        // GET: api/LessonLog/5
        public async Task<IActionResult> GetById(int id)
        {
            var lessonLog = await _dailyLessonLogLayoutRepo.GetByIdAsync(id);
            if(lessonLog == null)
            {
                return NotFound();
            }
            return Ok(lessonLog.ToLessonLogDto());
        }

        [HttpDelete]
        [Route("{id}")]
        // DELETE: api/LessonLog/5
        public async Task<IActionResult> DeleteById([FromRoute] int id)
        {
            var lessonlog = await _dailyLessonLogLayoutRepo.DeleteAsync(id);
            if(lessonlog == null)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpPost]
        [Route("{TemplateId}")]
        // POST: api/LessonLog/5
        public async Task<IActionResult> CreateLessonLog([FromRoute] int TemplateId, [FromBody] CreateLessonLogRequestDto createRequest)
        {
            if(!await _templateTypeRepo.TemplateTypeExistsAsync(TemplateId))
            {
                return BadRequest("Template not found");
            }

            var newLessonLog = createRequest.ToLessonLogFromCreateDto(TemplateId);
            await _dailyLessonLogLayoutRepo.CreateAsync(newLessonLog);
            return CreatedAtAction(nameof(GetById), new { id = newLessonLog.Id }, newLessonLog.ToLessonLogDto());
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateLessonLog([FromRoute] int id, [FromBody] UpdateLessonLogRequestDto updateRequest)
        {
            var lessonLog = await _dailyLessonLogLayoutRepo.UpdateAsync(id, updateRequest);
            if(lessonLog == null)
            {
                return NotFound();
            }
            return Ok(lessonLog.ToLessonLogDto());
        }
    }
}