using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Model;

namespace API.Interfaces
{
    public interface IUserStudentJoin
    {
        Task<List<Student>> GetUserData(UserAccount user);
        Task<UserStudentJoin> CreateUserDataAsync(UserStudentJoin userData);
        Task<UserStudentJoin> DeleteDataAsync(UserAccount user, int studentId);
    }
}