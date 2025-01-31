using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto.WrittenWorks
{
    public class CreateWrittenWorksRequestDto
    {
        public string WorkDetails { get; set; } = string.Empty;
        public decimal grade { get; set; }
    }
}