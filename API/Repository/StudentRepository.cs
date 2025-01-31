using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dto.Student;
using API.Interfaces;
using API.Model;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class StudentRepository : IStudentRepository
    {
        private readonly ApplicationDbContext _context;
        public StudentRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Student> CreateStudentAsync(Student student)
        {
            await _context.Students.AddAsync(student);
            await _context.SaveChangesAsync();
            return student;
        }

        public async Task<Student?> DeleteStudentAsync(int id)
        {
            var student = await _context.Students.FirstOrDefaultAsync(x => x.Id == id);

            if(student == null)
            {
                return null;
            }

            _context.Remove(student);
            await _context.SaveChangesAsync();
            return student;
        }

        public async Task<List<Student>> GetAllStudentAsync()
        {
            return await _context.Students
                                 .Include(ww => ww.WrittenWorks).
                                 ToListAsync();
        }

        public async Task<Student?> GetByIdStudentAsync(int id)
        {
            var student = await _context.Students
                                        .Include(ww => ww.WrittenWorks)
                                        .FirstOrDefaultAsync(x => x.Id == id);
            
            if(student == null)
            {
                return null;
            }

            return student;
        }

        public async Task<bool> StudentExistsAsync(int id)
        {
            return await _context.Students.AnyAsync(x => x.Id == id);
        }

        public async Task<Student?> UpdateStudentAsync(int id, UpdateStudentRequestDto updateDto)
        {
            var studentModel = await _context.Students.FirstOrDefaultAsync(x => x.Id == id);
            Console.WriteLine(studentModel);
            if(studentModel == null)
            {
                return null;
            }

            _context.Entry(studentModel).CurrentValues.SetValues(updateDto);
            await _context.SaveChangesAsync();

            return studentModel;
        }
    }
}