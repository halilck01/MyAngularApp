import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateComponent } from '../create/create.component';
import { ShipmentRequestModelService } from '../../services/shipment.service';
import { ShipmentRequestModel } from '../../models/shipment.model';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BreadcrumbModule,
    CommonModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    InputTextModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    InputNumberModule,
    RadioButtonModule,
    FileUploadModule,
    DropdownModule,
    TagModule,
    DialogModule,
    FormsModule
],
  providers: [
    MessageService,
    ConfirmationService,
    DialogService
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent {
    shipmentDialog: boolean = false;    
    
    shipment!: any;
    
    constructor(
        private confirmationService: ConfirmationService,
        public dialogService: DialogService,
        public messageService: MessageService,
        private shipmentRequestModelService: ShipmentRequestModelService,
        private http: HttpClient
        ) {}
    
    selectedShipments!: any[] | null;
    
    shipmentRequestModels: ShipmentRequestModel[] = []; 

    selectedMode: any = null;
    selectedMovementType: any = null;
    selectedIncoterms: any = null;
    selectedCountriescities: any = null;
    selectedPackageTypes: any = null;
    selectedUnit1s: any = null;
    selectedUnit2s: any = null;
    selectedCurrencies: any = null;
    selectedShipmentId: any = null;
    
    submitted: boolean = false;
    
    modes: any[] = [];
    movementTypes: any[] = [];
    incoterms: any[] = [];
    countriescities: any[] = [];
    packageTypes: any[] = [];
    unit1s: any[] = [];
    unit2s: any[] = [];
    currencies: any[] = [];
    selectedShipment: any;

    statuses!: any[];
    
    ref: DynamicDialogRef | undefined;
    updateModel: ShipmentRequestModel = new ShipmentRequestModel();
    
    openNew() {
        this.shipmentRequestModels = [];
        this.submitted = false;
        this.shipmentDialog = true;
    }
    hideDialog() {
        this.shipmentDialog = false;
        this.submitted = false;
    }
    ngOnInit() {
        this.getShipments(); 
    }
    show(){
        this.ref = this.dialogService.open(CreateComponent,{
            header: 'Create New Price',
            width: '30%',
            contentStyle: {overflow:'auto'},
            baseZIndex: 10000,
            maximizable:false,
        });
        
        this.ref.onClose.subscribe((data:any) => {
            if(data){
                this.messageService.add({severity:'info', summary:'Shipment Selected', detail: data});
            }
        });
        
        this.ref.onMaximize.subscribe((value) => {
            this.messageService.add({severity:'info', summary:'Maximized', detail: `maximized: ${value.maximized}`});          
        });
        
    }
    getShipments() {
        this.http.get<any[]>("https://localhost:7253/api/Shipment/GetShipments").subscribe({
            next: (data) => {
                this.shipmentRequestModels = data;
            },
            error: (e) => console.error(e)
        });
    }
    getShipmentById(id: string) {
        this.getDefinition('Modes');
        this.getDefinition('MovementTypes');
        this.getDefinition('Incoterms');
        this.getDefinition('CountriesCities');
        this.getDefinition('PackageTypes');
        this.getDefinition('Unit1s');
        this.getDefinition('Unit2s');
        this.getDefinition('Currencies');
        this.http.get<any>(`https://localhost:7253/api/Shipment/GetShipmentsById/${id}`).subscribe({
            next: (data) => {
                this.selectedShipment = data;
                this.selectedMode = this.modes.find(m => m.id === this.selectedShipment.modeId);
                this.selectedMovementType = this.movementTypes.find(mt => mt.id === data.movementType.id);
                this.selectedIncoterms = this.incoterms.find(i => i.id === data.incoterm.id);
                this.selectedCountriescities = this.countriescities.find(cc => cc.id === data.countryCities.id);
                this.selectedPackageTypes = this.packageTypes.find(pt => pt.id === data.packageType.id);
                this.selectedUnit1s = this.unit1s.find(u1 => u1.id === data.unit1.id);
                this.selectedUnit2s = this.unit2s.find(u2 => u2.id === data.unit2.id);
                this.selectedCurrencies = this.currencies.find(c => c.id === data.currency.id);
                this.selectedShipmentId = this.selectedShipment.id;
                this.shipmentDialog = true;
                console.log(data);
            },
            error: (e) => console.error(e)
        });
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
    updateShipment() {
        const updatedShipment = {
        id:this.selectedShipmentId, // mevcut gönderinin ID'si
        modeId: this.selectedMode.id,
        movementTypeId: this.selectedMovementType.id,
        incotermId: this.selectedIncoterms.id,
        countryCitiesId: this.selectedCountriescities.id,
        packageTypeId: this.selectedPackageTypes.id,
        unit1Id: this.selectedUnit1s.id,
        unit2Id: this.selectedUnit2s.id,
        currencyId: this.selectedCurrencies.id
    };

    this.http.post('https://localhost:7253/api/Shipment/UpdateShipment', updatedShipment)
        .subscribe({
            next: (response) => {
                console.log('Shipment updated:', response);
                this.hideDialog();
                this.getShipments();
            },
            error: (error) => {
                console.error('Update error:', error);
            }
        });
    }
    deleteShipments(shipment: any) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.http.delete(`https://localhost:7253/api/Shipment/DeleteShipment?id=${shipment.id}`).subscribe({
                  next: () => {
                      this.shipmentRequestModels = this.shipmentRequestModels.filter(val => val.id !== shipment.id);
                      this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Shipment Deleted', life: 2000});
                      this.getShipments();
                  },
                  error: (e) => {
                      console.error(e);
                      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error deleting shipment'});
                  }
              });
          }
      });
    }
 
}