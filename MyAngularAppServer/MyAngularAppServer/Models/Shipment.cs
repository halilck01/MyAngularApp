namespace ForcegetTaskServer.Models
{
    public class Shipment
    {
        public Shipment()
        {
            Id = Guid.NewGuid();
        }
        public Guid Id { get; set; }
        public Guid? ModeId { get; set; }
        public Mode? Mode { get; set; }
        public Guid? MovementTypeId { get; set; }
        public MovementType? MovementType { get; set; }
        public Guid? IncotermId { get; set; }
        public Incoterm? Incoterm { get; set; }
        public Guid? CountryCitiesId { get; set; }
        public CountryCity? CountryCities { get; set; }
        public Guid? PackageTypeId { get; set; }
        public PackageType? PackageType { get; set; }
        public Guid? Unit1Id { get; set; }
        public Unit1? Unit1 { get; set; }
        public Guid? Unit2Id { get; set; }
        public Unit2? Unit2 { get; set; }
        public Guid? CurrencyId { get; set; }
        public Currency? Currency { get; set; }
        public Guid? AppUserId { get; set; }


    }
}