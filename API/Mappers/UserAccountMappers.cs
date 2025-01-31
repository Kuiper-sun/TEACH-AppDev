using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.UserAccount;
using API.Dto.UserAccountDto;
using API.Model;

namespace API.Mappers
{
    public static class UserAccountMappers
    {
        public static UserAccountDto ToUserAccountDto(this UserAccount userAccount)
        {
            return new UserAccountDto
            {
                FullName = userAccount.FullName,
                Email = userAccount.Email,
                Password = userAccount.Password,
                SchoolResources = userAccount.SchoolResources.Select(resource => resource.ToSchoolResourceDto()).ToList(),
                SchoolTasks = userAccount.SchoolTasks.Select(task => task.ToSchoolTaskDto()).ToList()
            };
        }

        public static UserAccount ToUserAccountFromCreateUserDto(this CreateUserAccountRequestDto createUserDto)
        {
            return new UserAccount
            {
                FullName = createUserDto.FullName,
                Email = createUserDto.Email,
                Password = createUserDto.Password
            };
        }

        public static UserInfoDto ToUserInfoDto(this UserAccount userAccount)
        {
            return new UserInfoDto
            {
                Id = userAccount.Id,
                FullName = userAccount.FullName,
                Email = userAccount.Email,
                Password = userAccount.Password
            };
        }

        
    }
}