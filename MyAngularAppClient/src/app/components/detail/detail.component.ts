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
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DefinationNameRequestModel } from '../../models/defination.model';
import { CreatedefinationComponent } from '../createdefination/createdefination.component';

@Component({
  selector: 'app-detail',
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
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  
  constructor(private confirmationService: ConfirmationService,public dialogService: DialogService,public messageService: MessageService,private http: HttpClient) {}
  
    definations!: any;
    definationDialog: boolean = false;    
    selectedShipments!: any[] | null;
    definationNameRequestModel: DefinationNameRequestModel[] = [];
    selectedTable: string | null = null;   
    newName: string | null = null;
    oldName: string = '';
    submitted: boolean = false;
    
    modes: any[] = [];
    movementTypes: any[] = [];
    incoterms: any[] = [];
    countriescities: any[] = [];
    packageTypes: any[] = [];
    unit1s: any[] = [];
    unit2s: any[] = [];
    currencies: any[] = [];

    statuses!: any[];
    
    ref: DynamicDialogRef | undefined;
    
    openNew() {
        this.submitted = false;
        this.definationDialog = true;
    }
    deleteDefination(selectedTable: string, defination: any) {
        this.confirmationService.confirm({
          message: 'Are you sure you want to delete?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            const body = {
              tableName: selectedTable,
              name: defination.names
            };
            const options = {
              body: body
            };
            this.http.delete('https://localhost:7000/api/Defination/DeleteName', options).subscribe({
              next: () => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Item Deleted', life: 2000 });
                this.selectedTableGetNames();
              },
              error: (error) => {
                console.error(error);
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting item', life: 2000 });
              }
            });
          }
        });
    }     
    hideDialog() {
        this.definationDialog = false;
        this.submitted = false;
    }
    saveShipment() {
    if (!this.selectedTable || !this.newName) {
      this.messageService.add({severity: 'warn', summary: 'Warning', detail: 'Please fill all the fields.'});
      return;
    }
  
    this.http.get<any[]>(`https://localhost:7000/api/Defination/GetNames/${this.selectedTable}`).subscribe({
      next: (existingNames) => {
        const isNameExist = existingNames.some(def => def.name.toLowerCase() === this.newName?.toLowerCase());
        
        if (isNameExist) {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'This name already exists!'});
          this.newName = '';
        } else {
          const updateData = {
            oldName: this.oldName,
            newName: this.newName,
            tableName: this.selectedTable
          };
  
          this.http.put(`https://localhost:7000/api/Defination/UpdateName`, updateData).subscribe({
            next: () => {
              this.messageService.add({severity: 'success', summary: 'Success', detail: 'Defination updated successfully'});
              this.hideDialog();
              this.selectedTableGetNames(); // Yeniden isim listesini çek
            },
            error: (error) => {
              this.messageService.add({severity: 'error', summary: 'Error', detail: 'There was an error updating the defination'});
              console.error('Error:', error);
            }
          });
        }
      },
      error: (error) => {
        console.error('Error fetching existing names:', error);
      }
    });
    }  
    updateDefination(selectedTable: string, item: any) {
      this.oldName = item.names;
      this.newName = '';
      this.selectedTable = selectedTable;
      this.definationDialog = true;
    }
    show(){
        this.ref = this.dialogService.open(CreatedefinationComponent,{
            header: 'Create New Defination',
            width: '30%',
            contentStyle: {overflow:'auto'},
            baseZIndex: 10000,
            maximizable:false,
        });

        this.ref.onClose.subscribe((data:any) => {
            if(data){
                this.messageService.add({severity:'info', summary:'Defination Selected', detail: data});
            }
        });

        this.ref.onMaximize.subscribe((value) => {
                this.messageService.add({severity:'info', summary:'Maximized', detail: `maximized: ${value.maximized}`});          
        });

    }
    ngOnInit() {
    this.definations = [
        { name: 'Modes' },
        { name: 'MovementTypes'},
        { name: 'PackageTypes'},
        { name: 'Currencies'},
        { name: 'CountriesCities'},
        { name: 'Incoterms'},
        { name: 'Unit1s'},
        { name: 'Unit2s'},
    ];
    }
    selectedTableGetNames() {
    if (this.selectedTable) {
        this.http.get<any[]>(`https://localhost:7000/api/Defination/GetNames/${this.selectedTable}`).subscribe({
            next: (data) => {
              this.definationNameRequestModel = data.map(item => ({ names: item.name}));
            },
            error: (error) => {
              console.error('Error fetching data:', error);
            }
          });
      } else {
      console.log('No table selected');
      }
    }  
}
