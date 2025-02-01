using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.Student;
using API.Interfaces;
using API.Mappers;
using API.Model;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/Student")]
    public class StudentController : ControllerBase
    {
        private readonly IStudentRepository _studentRepo;
        public StudentController(IStudentRepository studentRepo)
        {
            _studentRepo = studentRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllStudent()
        {
            var students = await _studentRepo.GetAllStudentAsync();
            var studentDto = students.Select(s => s.toStudentDto());

            return Ok(studentDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetStudentById(int id)
        {
            var student = await _studentRepo.GetByIdStudentAsync(id);

            if(student == null)
            {
                return NotFound("Student Not Found");
            }

            return Ok(student);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteStudentById([FromRoute] int id)
        {
            var student = await _studentRepo.DeleteStudentAsync(id);
            if(student == null)
            {
                return NotFound("Student Not Found");
            }

            return NoContent();
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateStudent([FromRoute] int id, [FromBody] UpdateStudentRequestDto updateDto)
        {
            var student = await _studentRepo.UpdateStudentAsync(id, updateDto);

            if(student == null)
            {
                return NotFound("Student Not Found");
            }

            return Ok(student);
        }

        [HttpPost]
        public async Task<IActionResult> CreateStudent([FromBody] CreateStudentRequestDto createDto)
        {
            var studentDto = createDto.toStudentFromCreateStudentRequestDto();
            await _studentRepo.CreateStudentAsync(studentDto);
            return CreatedAtAction(nameof(GetStudentById), new{id = studentDto.Id}, studentDto.toStudentDto());
        }
    }
}