using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.PerformanceTask;
using API.Interfaces;
using API.Mappers;
using API.Model;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/PT")]
    public class PerformanceTaskController : ControllerBase
    {
        private readonly IPerformanceTaskRepository _ptRepo;
        private readonly IStudentRepository _studentRepo;
        public PerformanceTaskController(IPerformanceTaskRepository ptRepo, IStudentRepository studentRepo)
        {
            _ptRepo = ptRepo;
            _studentRepo = studentRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPt()
        {
            var pt = await _ptRepo.GetAllPtAsync();
            var ptDto = pt.Select(pt => pt.toPerformanceTaskDto());

            return Ok(ptDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPtById(int id)
        {
            var pt = await _ptRepo.GetByPtByIdAsync(id);
            if(pt == null)
            {
                return NotFound();
            }

            return Ok(pt);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteById([FromRoute] int id)
        {
            var pt = await _ptRepo.DeletePtByIdAsync(id);
            if(pt == null)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpPost]
        [Route("{StudentId}")]
        public async Task<IActionResult> CreatePtByStudentId([FromRoute] int StudentId, CreatePerformanceTaskDto createDto)
        {
            if(!await _studentRepo.StudentExistsAsync(StudentId))
            {
                return NotFound("Student Not Found");
            }

            var pt = createDto.ToPerformanceTaskFromCreatePerformanceTaskDto(StudentId);
            await _ptRepo.CreatePtAsync(pt);
            return CreatedAtAction(nameof(GetPtById), new { id = pt.Id }, pt.toPerformanceTaskDto());
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdatePtById([FromRoute] int id, UpdatePerfomanceTaskRequestDto updateDto)
        {
            var pt = await _ptRepo.UpdatePtByIdAsync(id, updateDto);
            if(pt == null)
            {
                return NotFound();
            }

            return Ok(pt);
        }


    }
}