using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.SchoolResource;
using API.Model;

namespace API.Mappers
{
    public static class SchoolResourceMappers
    {
        public static SchoolResourceDto ToSchoolResourceDto(this SchoolResource resource)
        {
            return new SchoolResourceDto
            {
                ResourceType = resource.ResourceType,
                Title = resource.Title,
                Description = resource.Description,
                FileURL = resource.FileURL
            };
        }

        public static SchoolResource ToSchoolResourceFromCreateRequestDto(this CreateResourceRequestDto request, int UserId)
        {
            return new SchoolResource
            {
                ResourceType = request.ResourceType,
                Title = request.Title,
                Description = request.Description,
                FileURL = request.FileURL,
                UserAccountId = UserId  
            };
        }
    }
}