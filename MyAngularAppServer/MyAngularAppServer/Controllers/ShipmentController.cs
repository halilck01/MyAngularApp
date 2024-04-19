using ForcegetTaskServer.Abstractions;
using ForcegetTaskServer.Context;
using ForcegetTaskServer.DTOs;
using ForcegetTaskServer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ForcegetTaskServer.Controllers
{
    public class ShipmentController : ApiController
    {
        private readonly ApplicationDbContext _context;

        public ShipmentController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult GetShipments()
        {
            var shipments = _context.Shipments.AsQueryable()
                            .Include(x => x.Mode)
                            .Include(x => x.MovementType)
                            .Include(x => x.Incoterm)
                            .Include(x => x.CountryCities)
                            .Include(x => x.PackageType)
                            .Include(x => x.Unit1)
                            .Include(x => x.Unit2)
                            .Include(x => x.Currency)
                            .ToList();

            return Ok(shipments);
        }
        [HttpPost]
        public ActionResult CreateShipment(ShipmentAddDto shipmentDTO)
        {
            Shipment shipment = new Shipment();
            try
            {
                shipment = new Shipment
                {
                    ModeId = shipmentDTO.ModeId,
                    MovementTypeId = shipmentDTO.MovementTypeId,
                    IncotermId = shipmentDTO.IncotermId,
                    CountryCitiesId = shipmentDTO.CountryCitiesId,
                    PackageTypeId = shipmentDTO.PackageTypeId,
                    Unit1Id = shipmentDTO.Unit1Id,
                    Unit2Id = shipmentDTO.Unit2Id,
                    CurrencyId = shipmentDTO.CurrencyId,
                    AppUserId = Guid.Parse("6B115F01-8791-4491-6F61-08DC41442893")
                };
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            

            try
            {
                _context.Shipments.Add(shipment);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(shipment);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetShipmentsById(Guid id)
        {
            var shipment = await _context.Shipments
                             .Include(x => x.Mode)
                             .Include(x => x.MovementType)
                             .Include(x => x.Incoterm)
                             .Include(x => x.CountryCities) 
                             .Include(x => x.PackageType)
                             .Include(x => x.Unit1)
                             .Include(x => x.Unit2)
                             .Include(x => x.Currency)
                             .FirstOrDefaultAsync(x => x.Id == id); 

            if (shipment == null)
            {
                return NotFound(); 
            }

            return Ok(shipment);
        }
        [HttpPost]
        public IActionResult UpdateShipment(ShipmentUpdateDto shipmentDTO)
        {
            var shipment = _context.Shipments.FirstOrDefault(s => s.Id == shipmentDTO.Id);
            if (shipment == null)
            {
                return NotFound($"Shipment with ID {shipmentDTO.Id} not found.");
            }

            shipment.ModeId = shipmentDTO.ModeId;
            shipment.MovementTypeId = shipmentDTO.MovementTypeId;
            shipment.IncotermId = shipmentDTO.IncotermId;
            shipment.CountryCitiesId = shipmentDTO.CountryCitiesId;
            shipment.PackageTypeId = shipmentDTO.PackageTypeId;
            shipment.Unit1Id = shipmentDTO.Unit1Id;
            shipment.Unit2Id = shipmentDTO.Unit2Id;
            shipment.CurrencyId = shipmentDTO.CurrencyId;

            _context.Shipments.Update(shipment);
            _context.SaveChanges();

            return Ok();
        }
        [HttpDelete]
        public IActionResult DeleteShipment(Guid id)
        {
            var shipment = _context.Shipments.FirstOrDefault(s => s.Id == id);
            if (shipment == null)
            {
                return NotFound($"Shipment with ID {id} not found.");
            }

            _context.Shipments.Remove(shipment);
            _context.SaveChanges();

            return Ok();
        }
    }
}
