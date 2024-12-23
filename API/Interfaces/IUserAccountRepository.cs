using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.UserAccountDto;
using API.Model;

namespace API.Interfaces
{
    public interface IUserAccountRepository
    {
        Task<List<UserAccount>> GetUserAccountsAsync();
        Task<UserAccount?> GetByIdAsync(int id);
        Task<UserAccount> CreateAsync(UserAccount userAccount);
        Task<UserAccount?> UpdateAsync(int id, UpdateAccountRequestDto updateDto);

        Task<UserAccount?> DeleteAsync(int id);
    }
}