using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto.Student
{
    public class UpdateStudentRequestDto
    {
        public string StudentName { get; set; } = string.Empty;
        public string StudentLrn { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Section { get; set; } = string.Empty;
    }
}