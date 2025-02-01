using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.QuarterlyAssessment;
using API.Interfaces;
using API.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/Assessments")]
    public class QuarterlyAssessmentController : ControllerBase
    {
        private readonly IQuarterlyAssessmentRepository _assessmentRepo;
        private readonly IStudentRepository _studentRepo;
        public QuarterlyAssessmentController(IQuarterlyAssessmentRepository assessmentRepo, IStudentRepository studentRepo)
        {
            _assessmentRepo = assessmentRepo;
            _studentRepo = studentRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllQa()
        {
            var qa = await _assessmentRepo.GetQuarterlyAssessmentsAsync();
            var qaDto = qa.Select(qa => qa.toQuarterlyAssessmentDto());

            return Ok(qaDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuarterlyAssessmentById(int id)
        {
            var qa = await _assessmentRepo.GetQuarterlyAssessmentByIdAsync(id);
            if(qa == null)
            {
                return NotFound();
            }

            return Ok(qa);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteById([FromRoute] int id)
        {
            var qa = await _assessmentRepo.DeleteQuarterlyAssessmentAsync(id);
            if(qa == null)
            {
                return NotFound();
            }
            return NoContent();
        }


        [HttpPost]
        [Route("{StudentId}")]
        public async Task<IActionResult> CreatePtByStudentId([FromRoute] int StudentId, CreateQuarterlyAssessmentDto createDto)
        {
            if(!await _studentRepo.StudentExistsAsync(StudentId))
            {
                return NotFound("Student Not Found");
            }

            var qa = createDto.toQuarterlyAssessmentFromCreateDto(StudentId);
            await _assessmentRepo.CreateQuarterlyAssessmentAsync(qa);
            return CreatedAtAction(nameof(GetQuarterlyAssessmentById), new { id = qa.Id }, qa.toQuarterlyAssessmentDto());
        }

        [HttpPut]
        [Route("{id}")]
        // PUT: api/Resources/5
        public async Task<IActionResult> UpdateResource([FromRoute] int id, [FromBody] UpdateQuarterlyAssessmentDto updateDto)
        {
            var qa = await _assessmentRepo.UpdateQuarterlyAssessmentAsync(id, updateDto);
            if (qa == null)
            {
                return NotFound();
            }

            return Ok(qa.toQuarterlyAssessmentDto());
        }
    }
}