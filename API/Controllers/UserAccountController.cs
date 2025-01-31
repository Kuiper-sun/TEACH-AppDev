using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dto.UserAccount;
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
        private readonly IUserAccountRepository _userAccountRepo;
        public UserAccountController(ApplicationDbContext context, IUserAccountRepository userAccountRepository)
        {
            _context = context;
            _userAccountRepo= userAccountRepository;
        }


        // GET: api/UserAccount
        [HttpGet]
        public async Task<ActionResult> GetUserAccounts()
        {
            var userAccounts = await _userAccountRepo.GetUserAccountsAsync();
            var userAccountsDto = userAccounts.Select(u => u.ToUserAccountDto());
            return Ok(userAccountsDto);
        }

        // GET: api/UserAccount/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult> GetUserAccount(int id)
        {
            var userAccount = await _userAccountRepo.GetByIdAsync(id);
            if (userAccount == null)
            {
                return NotFound();
            }
            return Ok(userAccount.ToUserAccountDto());
        }

        [HttpPost]
        [Route("/login")]
        public async Task<IActionResult> GetUserInfo([FromBody] LoginRequestDto loginRequest)
        {
            var user = await _userAccountRepo.GetUserInfoAsync(loginRequest.Email, loginRequest.Password);

            if(user == null)
            {
                return NotFound("Invalid Email or Password");
            }

            return Ok(new UserInfoDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email
            });
        }


        // POST: api/UserAccount
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUserAccountRequestDto createUserDto)
        {
            var userAccount = createUserDto.ToUserAccountFromCreateUserDto();
            await _userAccountRepo.CreateAsync(userAccount);
            return CreatedAtAction(nameof(GetUserAccount), new { id = userAccount.Id }, userAccount.ToUserAccountDto());
        }

        // PUT: api/UserAccount/{id}
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateAccountRequestDto updateDto)
        {
            var userAccount = await _userAccountRepo.UpdateAsync(id, updateDto);
            if (userAccount == null)
            {
                return NotFound();
            }
            // userAccount.FullName = updateAccountRequestDto.FullName;
            // userAccount.Email = updateAccountRequestDto.Email;
            // userAccount.Password = updateAccountRequestDto.Password;

            //Automatic Mapping
            return Ok(userAccount.ToUserAccountDto());
        }

        [HttpDelete]
        [Route("{id}")] 
        public async Task<IActionResult> Delete(int id)
        {
            var userAccount = await _userAccountRepo.DeleteAsync(id);
            if (userAccount == null)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}