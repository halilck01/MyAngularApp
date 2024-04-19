using ForcegetTaskServer.Abstractions;
using ForcegetTaskServer.Context;
using ForcegetTaskServer.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace ForcegetTaskServer.Controllers
{

    public class DefinationController : ApiController
    {
        private readonly ApplicationDbContext _context;
        private readonly string _connectionString;
        public DefinationController(IConfiguration configuration, ApplicationDbContext context)
        {
            _context = context;
            _connectionString = configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Database connection string 'DefaultConnection' not found.");
        }

        [HttpGet("{tableName}")]
        public IActionResult GetNames(string tableName)
        {
            if (!System.Text.RegularExpressions.Regex.IsMatch(tableName, "^[a-zA-Z0-9_]+$"))
            {
                return BadRequest("Invalid table name");
            }

            List<NameIdPair> pairs = new List<NameIdPair>();
            var query = $"SELECT Id, Name FROM [{tableName}]";

            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand(query, connection))
            {
                try
                {
                    connection.Open();
                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var pair = new NameIdPair
                            {
                                Id = reader["Id"].ToString(),
                                Name = reader["Name"].ToString()
                            };
                            pairs.Add(pair);
                        }
                    }
                }
                catch (SqlException e)
                {
                    return StatusCode(500, $"Database error: {e.Message}");
                }
            }
            return Ok(pairs);
        }


        [HttpPost]
        public IActionResult AddName(DefinationDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var query = $"INSERT INTO [{model.TableName}] (name, Id) VALUES ('{model.Name.Replace("'", "''")}','{Guid.NewGuid()}')";

            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand(query, connection))
            {               
                try
                {
                    connection.Open();
                    command.ExecuteNonQuery();
                }
                catch (SqlException e)
                {
                    return StatusCode(500, $"Database error: {e.Message}");
                }
            }

            return Ok();
        }

        [HttpPut]
        public IActionResult UpdateName(UpdateDefinationDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var query = $"UPDATE [{model.TableName}] SET name = '{model.NewName.Replace("'", "''")}' WHERE name = '{model.OldName.Replace("'", "''")}'";

            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand(query, connection))
            {
                try
                {
                    connection.Open();
                    command.ExecuteNonQuery();
                }
                catch (SqlException e)
                {
                    return StatusCode(500, $"Database error: {e.Message}");
                }
            }
            return Ok();
        }

        [HttpDelete]
        public IActionResult DeleteName(DefinationDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var checkQuery = $"SELECT COUNT(*) FROM [Shipments] WHERE ModeId = (SELECT Id FROM [{model.TableName}] WHERE Name = '{model.Name.Replace("'", "''")}')";

            var connection = new SqlConnection(_connectionString);
            using (var checkCommand = new SqlCommand(checkQuery, connection))
            {
                try
                {
                    connection.Open();
                    var count = (int)checkCommand.ExecuteScalar();
                    if (count > 0)
                    {
                        return BadRequest($"Cannot delete this {model.Name} because it is used in shipments.");
                    }
                }
                catch (SqlException e)
                {
                    return StatusCode(500, $"Database error: {e.Message}");
                }
            }

            var deleteQuery = $"DELETE FROM [{model.TableName}] WHERE Name = '{model.Name.Replace("'", "''")}'";
            using (var command = new SqlCommand(deleteQuery, connection))
            {
                try
                {
                    command.ExecuteNonQuery();
                }
                catch (SqlException e)
                {
                    return StatusCode(500, $"Database error: {e.Message}");
                }
            }
            return Ok();
        }
    }
}
