using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dto.UserAccountDto;
using API.Interfaces;
using API.Model;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class UserAccountRepository : IUserAccountRepository
    {

        //Dependency Injection with the DB Context
        private readonly ApplicationDbContext  _context;
        public UserAccountRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<UserAccount> CreateAsync(UserAccount userAccount)
        {
            await _context.UserAccounts.AddAsync(userAccount);
            await _context.SaveChangesAsync();
            return userAccount;
        }

        public async Task<UserAccount?> DeleteAsync(int id)
        {
            var user = await _context.UserAccounts.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
            {
                return null;
            }

            _context.UserAccounts.Remove(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<UserAccount?> GetByIdAsync(int id)
        {
            var user = await _context.UserAccounts.Include(r => r.SchoolResources).Include(t => t.SchoolTasks).FirstOrDefaultAsync(x => x.Id == id);
            if(user == null)
            {
                return null;
            }

            return user;
        }

        public async Task<List<UserAccount>> GetUserAccountsAsync()
        {
            return await _context.UserAccounts.Include(r => r.SchoolResources).Include(t => t.SchoolTasks).ToListAsync();
        }

        public async Task<UserAccount?> GetUserInfoAsync(string email, string password)
        {
            var user =  await _context.UserAccounts.FirstOrDefaultAsync(x => x.Email == email && x.Password == password);

            if(user == null)
            {
                return null;
            }

            return user;
        }

        public async Task<UserAccount?> UpdateAsync(int id, UpdateAccountRequestDto updateDto)
        {
            var userModel = await _context.UserAccounts.FirstOrDefaultAsync(x => x.Id == id);
            if (userModel == null)
            {
                return null;
            }

            //Automatic mapping of the properties from the DTO to the Model
            _context.Entry(userModel).CurrentValues.SetValues(updateDto);
            await _context.SaveChangesAsync();
            return userModel;
        }

        public async Task<bool> UserAccountExistsAsync(int id)
        {
            return await _context.UserAccounts.AnyAsync(x => x.Id == id);
        }
    }
}