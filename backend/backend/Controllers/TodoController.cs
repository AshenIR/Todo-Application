using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly TodoDbContext _dbContext;

        public TodoController(TodoDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoModel>>> GetTodos()
        {
            if (_dbContext.Todos == null)
            {
                return NotFound();
            }
            return await _dbContext.Todos.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TodoModel>> GetTodos(int id)
        {
            if (_dbContext.Todos == null)
            {
                return NotFound();
            }
            var todo = await _dbContext.Todos.FindAsync(id);
            if (todo == null)
            {
                return NotFound();
            }
            return todo;
        }

        [HttpPost]

        public async Task<ActionResult<TodoModel>> PostTodo(TodoModel todo)
        {
            _dbContext.Todos.Add(todo);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTodos), new { id = todo.Id }, todo);
        }

        [HttpPut]

        public async Task<IActionResult> PutTodo(int id, TodoModel todo)
        {
            if (id != todo.Id)
            {
                return BadRequest();
            }
            _dbContext.Entry(todo).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoAvailable(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok();

        }

        private bool TodoAvailable(int id)
        {
            return (_dbContext.Todos?.Any(x => x.Id == id)).GetValueOrDefault();
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteTodo(int id)
        {
            if (_dbContext.Todos == null)
            {
                return NotFound();
            }
            var todo = await _dbContext.Todos.FindAsync(id);
            if (todo == null)
            {
                return NotFound();
            }

            _dbContext.Todos.Remove(todo);

            await _dbContext.SaveChangesAsync();

            return Ok();
        }


    }
}
