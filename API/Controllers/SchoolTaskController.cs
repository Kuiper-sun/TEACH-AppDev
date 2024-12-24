using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.SchoolTask;
using API.Interfaces;
using API.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    [Route("api/Task")]
    [ApiController]
    public class SchoolTaskController : ControllerBase
    {
        private readonly ISchoolTaskRepository _schoolTaskRepo;
        private readonly IUserAccountRepository _userRepo;

        public SchoolTaskController(ISchoolTaskRepository schoolTaskRepo, IUserAccountRepository userRepo)
        {
            _schoolTaskRepo = schoolTaskRepo;
            _userRepo = userRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTasks()
        {
            var tasks = await _schoolTaskRepo.GetALlTasks();
            var tasksDto = tasks.Select(t => t.ToSchoolTaskDto());

            return Ok(tasksDto);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetTaskById([FromRoute] int id)
        {
            var task = await _schoolTaskRepo.GetByIdAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            return Ok(task.ToSchoolTaskDto());
        }

        [HttpPost]
        [Route("{UserId}")]
        public async Task<IActionResult> CreateTask([FromRoute] int UserId,[FromBody] CreateSchoolTaskDto createTaskDto)
        {
            if(!await _userRepo.UserAccountExistsAsync(UserId))
            {
                return BadRequest("User not found");
            }

            var task = createTaskDto.ToSchoolTaskFromCreateTaskDto(UserId);
            await _schoolTaskRepo.CreateAsync(task);
            return CreatedAtAction(nameof(GetTaskById), new { id = task.Id }, task.ToSchoolTaskDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteTask([FromRoute] int id)
        {
            var task = await _schoolTaskRepo.DeleteAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateTask([FromRoute] int id, [FromBody] UpdateSchoolTaskRequestDto updateTaskDto)
        {
            var task = await _schoolTaskRepo.UpdateAsync(id, updateTaskDto);
            if (task == null)
            {
                return NotFound();
            }

            return Ok(task.ToSchoolTaskDto());
        }
    }
}