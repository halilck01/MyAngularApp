using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ForcegetTaskServer.DTOs
{
    public class UpdateDefinationDto : DefinationDto
    {
        public string OldName { get; set; } = string.Empty;
        public string NewName { get; set; } = string.Empty;
    }
}
