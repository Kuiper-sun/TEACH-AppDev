using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto.SchoolResource
{
    public class CreateResourceRequestDto
    {
        public string ResourceType { get; set; } = String.Empty;
        public string Title { get; set; } = String.Empty;
        public string Description { get; set; } = String.Empty;
        public string FileURL { get; set; } = String.Empty;
    }
}