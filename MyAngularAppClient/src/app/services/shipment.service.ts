import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShipmentRequestModel } from '../models/shipment.model';

@Injectable({
  providedIn: 'root'
})
export class ShipmentRequestModelService {
  getShipmentRequestModels() {
    throw new Error('Method not implemented.');
  }
  updateShipmentRequestModel(ShipmentRequestModel: ShipmentRequestModelService) {
    throw new Error('Method not implemented.');
  }
  private apiUrlGetShipments = 'https://localhost:7000/api/Shipment/GetShipments';
  private apiUrlUpdateShipments = 'https://localhost:7000/api/Shipment/GetShipments';
  private apiUrlDeleteShipments = 'https://localhost:7000/api/Shipment/GetShipments';
  private apiUrlGetDefination = 'https://localhost:7000/api/Defination/GetNames';

  constructor(private http: HttpClient) { }

  getShipments(): Observable<ShipmentRequestModel[]> {
    return this.http.get<ShipmentRequestModel[]>(`${this.apiUrlGetShipments}`);
  }

  updateShipment(shipment: ShipmentRequestModel): Observable<any> {
    return this.http.put(`${this.apiUrlUpdateShipments}`, shipment);
  }

  deleteShipment(id: ShipmentRequestModel): Observable<any> {
    return this.http.delete(`${this.apiUrlDeleteShipments}/${id}`);
  }

  getDefination(tableName: ShipmentRequestModel): Observable<any>{
    return this.http.get<ShipmentRequestModel[]>(`${this.apiUrlGetDefination}/${tableName}`);
  }
}
