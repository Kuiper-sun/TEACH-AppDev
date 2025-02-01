using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Model;

namespace API.Interfaces
{
    public interface IUserTemplateJoin
    {
        Task<List<TemplateType>> GetUserData(UserAccount user);
        Task<UserTemplateJoin> CreateUserDataAsync(UserTemplateJoin userData);

        Task<UserTemplateJoin> DeleteDataAsync(UserAccount user, int templateId);
    }
}