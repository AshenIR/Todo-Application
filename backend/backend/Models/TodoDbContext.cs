using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class TodoDbContext : DbContext
    {
        public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options)
        {

        }

        public DbSet<TodoModel> Todos { get; set; }
    }
}