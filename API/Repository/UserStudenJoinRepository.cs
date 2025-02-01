using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Interfaces;
using API.Model;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class UserStudenJoinRepository : IUserStudentJoin
    {
        private readonly ApplicationDbContext _context;
        public UserStudenJoinRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<UserStudentJoin> CreateUserDataAsync(UserStudentJoin userData)
        {
            await _context.UserStudentJoins.AddAsync(userData);
            await _context.SaveChangesAsync();
            return userData;
        }

        public async Task<UserStudentJoin> DeleteDataAsync(UserAccount user, int studentId)
        {
            var userData = await _context.UserStudentJoins.FirstOrDefaultAsync(x => x.UserId == user.Id && x.StudentId == studentId);
            if(userData == null)
            {
                return null;
            }

            _context.UserStudentJoins.Remove(userData);
            await _context.SaveChangesAsync();
            return userData;
        }

        public async Task<List<Student>> GetUserData(UserAccount user)
        {
            return await _context.UserStudentJoins.Where(u => u.UserId == user.Id)
                .Select(student => new Student
                {
                    Id = student.StudentId,
                    StudentName = student.Student.StudentName,
                    WrittenWorks = student.Student.WrittenWorks,
                    PerformanceTasks = student.Student.PerformanceTasks,
                    QuarterlyAssessments = student.Student.QuarterlyAssessments
                }).ToListAsync();
        }
    }
}