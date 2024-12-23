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

        public Task<UserAccount?> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<UserAccount>> GetUserAccountsAsync()
        {
            throw new NotImplementedException();
        }

        public Task<UserAccount?> UpdateAsync(int id, UpdateAccountRequestDto updateDto)
        {
            throw new NotImplementedException();
        }
    }
}