using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.WrittenWorks;
using API.Interfaces;
using API.Mappers;
using API.Model;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/WrittenWorks")]
    public class WrittenWorkController : ControllerBase
    {
        private readonly IWrittenWorkRepository _writtenWorksRepo;
        private readonly IStudentRepository _studentRepo;
        public WrittenWorkController(IWrittenWorkRepository writtenWorkRepo, IStudentRepository studentRepo)
        {
            _writtenWorksRepo = writtenWorkRepo;
            _studentRepo = studentRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllWrittenWork()
        {
            var writtenWorks = await _writtenWorksRepo.GetAllWrittenWorksAsync();
            var writtenWorksDto = writtenWorks.Select(wr => wr.toWrittenWorkDto());

            return Ok(writtenWorksDto);
        }

        [HttpGet("{id}")] 
        public async Task<IActionResult> GetWrittenWorkById(int id)
        {
            var writtenWork = await _writtenWorksRepo.GetWrittenWorkByIdAsync(id);
            if(writtenWork == null)
            {
                return NotFound();
            }
            return Ok(writtenWork);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteWrittenWorkById(int id)
        {
            var writtenWork = await _writtenWorksRepo.DeleteWrittenWorkByIdAsync(id);
            if(writtenWork == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateWrittenWorksById([FromRoute] int id, [FromBody] UpdateWrittenWorksRequestDto updateDto)
        {
            var writtenWork = await _writtenWorksRepo.UpdateWrittenWorkByIdAsync(id, updateDto);
            if(writtenWork == null)
            {
                return NotFound();
            }

            return Ok(writtenWork);
        }


        [HttpPost]
        [Route("{studentId}")]
        public async Task<IActionResult> CreateWrittenWorkForStudent([FromRoute] int studentId, [FromBody] CreateWrittenWorksRequestDto createDto)
        {
            //Check if Student Exists
            if(!await _studentRepo.StudentExistsAsync(studentId))
            {
                return NotFound("Student Not Found");
            }
            //Create the record
            var writtenWork = createDto.toWrittenWorkFromCreateRequestDto(studentId);
            await _writtenWorksRepo.CreateWrittenWorkAsync(writtenWork);
            return CreatedAtAction(nameof(GetWrittenWorkById), new { id = writtenWork.Id }, writtenWork.toWrittenWorkDto());
        }

    }
}