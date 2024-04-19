using ForcegetTaskServer.Models;

namespace ForcegetTaskServer.DTOs
{
    public class ShipmentAddDto
    {
        public Guid? ModeId { get; set; }
        public Guid? MovementTypeId { get; set; }
        public Guid? IncotermId { get; set; }
        public Guid? CountryCitiesId { get; set; }
        public Guid? PackageTypeId { get; set; }
        public Guid? Unit1Id { get; set; }
        public Guid? Unit2Id { get; set; }
        public Guid? CurrencyId { get; set; }            
        public Guid? AppUserId { get; set; }
    }
}
