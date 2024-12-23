using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dto.UserAccountDto;
using API.Interfaces;
using API.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/UserAccount")]
    [ApiController]
    public class UserAccountController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IUserAccountRepository _userAccountRepository;
        public UserAccountController(ApplicationDbContext context, IUserAccountRepository userAccountRepository)
        {
            _context = context;
            _userAccountRepository = userAccountRepository;
        }


        // GET: api/UserAccount
        [HttpGet]
        public async Task<ActionResult> GetUserAccounts()
        {
            var userAccounts = await _context.UserAccounts.ToListAsync();
            return Ok(userAccounts);
        }

        // GET: api/UserAccount/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult> GetUserAccount(int id)
        {
            var userAccount = await _context.UserAccounts.FindAsync(id);
            if (userAccount == null)
            {
                return NotFound();
            }
            return Ok(userAccount.ToUserAccountDto());
        }

        // POST: api/UserAccount
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUserAccountRequestDto createUserDto)
        {
            var userAccount = createUserDto.ToUserAccountFromCreateUserDto();
            await _userAccountRepository.CreateAsync(userAccount);
            return CreatedAtAction(nameof(GetUserAccount), new { id = userAccount.Id }, userAccount.ToUserAccountDto());
        }

        // PUT: api/UserAccount/{id}
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateAccountRequestDto updateDto)
        {
            var userAccount = await _context.UserAccounts.FirstOrDefaultAsync(x => x.Id == id);
            if (userAccount == null)
            {
                return NotFound();
            }
            // userAccount.FullName = updateAccountRequestDto.FullName;
            // userAccount.Email = updateAccountRequestDto.Email;
            // userAccount.Password = updateAccountRequestDto.Password;

            //Automatic Mapping
            _context.Entry(userAccount).CurrentValues.SetValues(updateDto);
            _context.UserAccounts.Update(userAccount);
            await _context.SaveChangesAsync();
            return Ok(userAccount.ToUserAccountDto());
        }

        [HttpDelete]
        [Route("{id}")] 
        public async Task<IActionResult> Delete(int id)
        {
            var userAccount = await _userAccountRepository.DeleteAsync(id);
            if (userAccount == null)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}