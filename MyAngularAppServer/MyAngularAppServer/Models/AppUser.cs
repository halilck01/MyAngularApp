using Microsoft.AspNetCore.Identity;

namespace ForcegetTaskServer.Models
{
    public sealed class AppUser : IdentityUser<Guid>
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;

        public string GetName()
        {
            return string.Join(" " , FirstName , LastName);
        }
    }
}
