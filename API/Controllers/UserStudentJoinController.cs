using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Model;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/UserStudentJoin")]
    public class UserStudentJoinController : ControllerBase
    {
        private readonly IUserAccountRepository _userAccountRepo;
        private readonly IStudentRepository _studentRepo;
        private readonly IUserStudentJoin _userStudentJoin;

        public UserStudentJoinController(IUserAccountRepository userAccountRepo, IStudentRepository studentRepo, IUserStudentJoin userStudentJoin)
        {
            _userAccountRepo = userAccountRepo;
            _studentRepo = studentRepo;
            _userStudentJoin = userStudentJoin;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserStudentData(int userId)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            
            var user = await _userAccountRepo.GetByIdAsync(userId);
            if(user == null)
            {
                return NotFound();
            }

            var userData = await _userStudentJoin.GetUserData(user);
            return Ok(userData);
        }


        [HttpPost]
        public async Task<IActionResult> CreateJoin(int userId, int studentId)
        {
            var user = await _userAccountRepo.GetByIdAsync(userId);
            if(user == null)
            {
                return NotFound("User Not Found");
            }

            var template = await _studentRepo.GetByIdStudentAsync(studentId);
            if(template == null)
            {
                return NotFound("Student Not Found");
            }

            var userData = await _userStudentJoin.GetUserData(user);
            //Check for duplicates
            if(userData.Any(e => e.Id == studentId))
            {
                return BadRequest("Cannot add the same student");
            }

            var newUserData = new UserStudentJoin
            {
                UserId = userId,
                StudentId = studentId
            };

            await _userStudentJoin.CreateUserDataAsync(newUserData);

            if(newUserData == null)
            {
                return StatusCode(500, "Could not create");
            }
            else
            {
                return Created();
            }
        }


        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteJoin(int userId, int studentId)
        {
            var user = await _userAccountRepo.GetByIdAsync(userId);
            if(user == null)
            {
                return NotFound("User Not Found");
            }

            var template = await _studentRepo.GetByIdStudentAsync(studentId);
            if(template == null)
            {
                return NotFound("Student Not Found");
            }

            var userData = await _userStudentJoin.GetUserData(user);

            var filterData = userData.Where(s => s.Id == studentId).ToList();

            if(filterData.Count() == 1)
            {
                await _userStudentJoin.DeleteDataAsync(user, studentId);
            }
            else
            {
                return BadRequest("");
            }
            return Ok();
        }
    }
}