using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.Student;
using API.Model;

namespace API.Interfaces
{
    public interface IStudentRepository
    {
        public Task<List<Student>> GetAllStudentAsync();

        public Task<Student?> GetByIdStudentAsync(int id);

        public Task<Student> CreateStudentAsync(Student student);

        public Task<Student?> UpdateStudentAsync(int id, UpdateStudentRequestDto updateDto);

        public Task<Student?> DeleteStudentAsync(int id);

        public Task<bool> StudentExistsAsync(int id);
    }
}