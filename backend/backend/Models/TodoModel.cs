
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class TodoModel
    {
        [Key]
        public int Id { get; set; }
        [Required]  
        public string Title { get; set; }
        public string Status { get; set; }
        public string Description { get; set; }

    }
}
