using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Model;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/UserTemplateJoin")]
    [ApiController]
    public class UserTemplateJoinController : ControllerBase
    {
        private readonly IUserAccountRepository _userAccountRepo;
        private readonly ITemplateTypeRepository _templateTypeRepo;
        private readonly IUserTemplateJoin _userTemplateJoinRepo;
        public UserTemplateJoinController(IUserAccountRepository userAccountRepo, ITemplateTypeRepository templateTypeRepo, IUserTemplateJoin userTemplateJoinRepo)
        {
            _userAccountRepo = userAccountRepo;
            _templateTypeRepo = templateTypeRepo;
            _userTemplateJoinRepo = userTemplateJoinRepo;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserTemplateData(int userId)
        {

            var user = await _userAccountRepo.GetByIdAsync(userId);
            if(user == null)
            {
                return NotFound();
            }

            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userData = await _userTemplateJoinRepo.GetUserData(user);

            if(!userData.Any())
            {
                return NotFound("No templates found");
            }
            return Ok(userData);
        }

        [HttpPost]
        public async Task<IActionResult> CreateJoin(int userId, int templateId)
        {
            var user = await _userAccountRepo.GetByIdAsync(userId);
            if(user == null)
            {
                return NotFound("User Not Found");
            }

            var template = await _templateTypeRepo.GetTemplateTypeByIdAsync(templateId);
            if(template == null)
            {
                return NotFound("Template Not Found");
            }

            var userData = await _userTemplateJoinRepo.GetUserData(user);
            //Check for duplicates
            if(userData.Any(e => e.Id == templateId))
            {
                return BadRequest("Cannot add the same template");
            }

            var newUserData = new UserTemplateJoin 
            {
                UserId = userId,
                TemplateId = templateId
            };

            await _userTemplateJoinRepo.CreateUserDataAsync(newUserData);

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
        public async Task<IActionResult> DeleteJoin(int userId, int templateId)
        {
            var user = await _userAccountRepo.GetByIdAsync(userId);
            if(user == null)
            {
                return NotFound("User Not Found");
            }

            var template = await _templateTypeRepo.GetTemplateTypeByIdAsync(templateId);
            if(template == null)
            {
                return NotFound("Template Not Found");
            }

            var userData = await _userTemplateJoinRepo.GetUserData(user);

            var filterData = userData.Where(s => s.Id == templateId).ToList();

            if(filterData.Count() == 1)
            {
                await _userTemplateJoinRepo.DeleteDataAsync(user, templateId);
            }
            else
            {
                return BadRequest("");
            }
            return Ok();
        }
    }
}