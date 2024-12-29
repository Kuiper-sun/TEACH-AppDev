using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.SchoolResource;
using API.Interfaces;
using API.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/Resources")]
    public class SchoolResourceController : ControllerBase
    {
        private readonly ISchoolResourceRepository _resourceRepo;
        private readonly IUserAccountRepository _userRepo;

        public SchoolResourceController(ISchoolResourceRepository resourceRepo, IUserAccountRepository userRepo)
        {
            _resourceRepo = resourceRepo;
            _userRepo = userRepo;
        }


        [HttpGet]
        // GET: api/Resources
        public async Task<IActionResult> GetAllResources()
        {
            var resources = await _resourceRepo.GetAllResources();
            var resourcesDto = resources.Select(r => r.ToSchoolResourceDto());
            
            return Ok(resourcesDto);
        }

        [HttpGet("{id}")]
        // GET: api/Resources/5
        public async Task<IActionResult> GetResourceById(int id)
        {
            var resource = await _resourceRepo.GetByIdAsync(id);
            if (resource == null)
            {
                return NotFound();
            }

            return Ok(resource.ToSchoolResourceDto());
        }


        [HttpPost]
        [Route("{UserId}")]
        // POST: api/Resources/5
        public async Task<IActionResult> CreateResource([FromBody] CreateResourceRequestDto createResourceDto, [FromRoute] int UserId)
        {
            if (!await _userRepo.UserAccountExistsAsync(UserId))
            {
                return BadRequest("User not found");
            }

            var resource = createResourceDto.ToSchoolResourceFromCreateRequestDto(UserId);
            await _resourceRepo.CreateAsync(resource);
            return CreatedAtAction(nameof(GetResourceById), new { id = resource.Id }, resource.ToSchoolResourceDto());
        }

        [HttpPut]
        [Route("{id}")]
        // PUT: api/Resources/5
        public async Task<IActionResult> UpdateResource([FromRoute] int id, [FromBody] UpdateResourceRequestDto updateResourceDto)
        {
            var resource = await _resourceRepo.UpdateAsync(id, updateResourceDto);
            if (resource == null)
            {
                return NotFound();
            }

            return Ok(resource.ToSchoolResourceDto());
        }
    }
}