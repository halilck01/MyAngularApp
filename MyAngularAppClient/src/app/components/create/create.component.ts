import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ShipmentRequestModel } from '../../models/shipment.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
  
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, DropdownModule, FormsModule,ToastModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [MessageService]
})

export class CreateComponent{
  modes: any[] = [];
  movementTypes: any[] = [];
  incoterms: any[] = [];
  countriescities: any[] = [];
  packageTypes: any[] = [];
  unit1s: any[] = [];
  unit2s: any[] = [];
  currencies: any[] = [];

  addModel: ShipmentRequestModel = new ShipmentRequestModel();

  modeInvalid: boolean = false;
  movementTypeInvalid: boolean = false;
  incotermInvalid: boolean = false;
  countriesCitiesInvalid: boolean = false;
  packageTypeInvalid: boolean = false;
  unit1Invalid: boolean = false;
  unit2Invalid: boolean = false;
  currencyInvalid: boolean = false;
    
  constructor(private http: HttpClient, private router: Router,public messageService: MessageService) {}

  shipmentDialog: boolean = false;    

  shipmentRequestModels: ShipmentRequestModel[] = [];

  ngOnInit() {
    this.getDefinition('Modes');
    this.getDefinition('MovementTypes');
    this.getDefinition('Incoterms');
    this.getDefinition('CountriesCities');
    this.getDefinition('PackageTypes');
    this.getDefinition('Unit1s');
    this.getDefinition('Unit2s');
    this.getDefinition('Currencies');
  }

  getDefinition(tableName: string) {
    this.http.get<string[]>(`https://localhost:7253/api/Defination/GetNames/${tableName}`).subscribe({
        next: (data) => {
            switch (tableName) {
                case 'Modes':
                    this.modes = data;
                    break;
                case 'MovementTypes':
                    this.movementTypes = data;
                    break;
                case 'Incoterms':
                    this.incoterms = data;
                    break;
                case 'CountriesCities':
                    this.countriescities = data;
                    break;
                case 'PackageTypes':
                    this.packageTypes = data;
                    break;
                case 'Unit1s':
                    this.unit1s = data;
                    break;
                case 'Unit2s':
                    this.unit2s = data;
                    break;
                case 'Currencies':
                    this.currencies = data;
                    break;
                default:
                    console.error('Unknown table name:', tableName);
            }
        },
        error: (e) => console.error(e)
    });
}

create() {
    this.validateForm();

    if (this.isFormValid()) {
        this.http.post("https://localhost:7253/api/Shipment/CreateShipment", this.addModel).subscribe({
            next: () => {
                this.router.navigate(['/']).then(() => {
                    window.location.reload();
                });
            },
            error: error => {
                console.error('Create shipment error:', error);
                this.messageService.add({severity:'error', summary:'Error', detail:'Shipment creation failed'});
            }
        });
    } else {
        this.messageService.add({severity:'warn', summary:'Warning', detail:'Please fill all the required fields'});
    }
}
  validateForm() {
    this.modeInvalid = !this.addModel.modeId;
    this.movementTypeInvalid = !this.addModel.movementTypeId;
    this.incotermInvalid = !this.addModel.incotermId;
    this.countriesCitiesInvalid = !this.addModel.countryCitiesId;
    this.packageTypeInvalid = !this.addModel.packageTypeId;
    this.unit1Invalid = !this.addModel.unit1Id;
    this.unit2Invalid = !this.addModel.unit2Id;
    this.currencyInvalid = !this.addModel.currencyId;
  }
  isFormValid() {
    return !this.modeInvalid && !this.movementTypeInvalid && !this.incotermInvalid && 
           !this.countriesCitiesInvalid && !this.packageTypeInvalid && !this.unit1Invalid && 
           !this.unit2Invalid && !this.currencyInvalid;
  }
  closeDialog() {
    this.shipmentDialog = false;
  }

}
