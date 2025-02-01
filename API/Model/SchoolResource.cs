using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    [Table("SchoolResource")]
    public class SchoolResource
    {
        public int Id { get; set; }
        public string ResourceType { get; set; } = String.Empty;
        public string Title { get; set; } = String.Empty;
        public string Description { get; set; } = String.Empty;
        public string FileURL { get; set; } = String.Empty;
        

        //Nav Property
        public int? UserAccountId { get; set; }
        public UserAccount? UserAccount { get; set; }
    }
}