import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DefinationNameRequestModel } from '../../models/defination.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-createdefination',
  standalone: true,
  imports: [CommonModule,FormsModule,ButtonModule,ToastModule],
  templateUrl: './createdefination.component.html',
  styleUrl: './createdefination.component.css',
  providers: [MessageService]
})
export class CreatedefinationComponent {
  newName: string | null = null;
  defination!: any;
  selectedTable: string | null = null;
  constructor(private http: HttpClient, private router: Router,public messageService: MessageService){}

create() {
  if (!this.selectedTable || !this.newName) {
      this.messageService.add({severity: 'warn', summary: 'Warning', detail: 'Please fill all the fields.'});
      return;
  }
  this.checkExistingNames();
}
checkExistingNames() {
  if (this.selectedTable) {
    this.http.get<any[]>(`https://localhost:7253/api/Defination/GetNames/${this.selectedTable}`).subscribe({
        next: (data) => {
          if (data.some(item => item.name === this.newName)) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'This name already exists in the table.'});
          } else {
            this.saveNewName();
          }
        },
        error: (error) => {
          console.error('Error fetching existing names:', error);
        }
    });
  } else {
    console.log('No table selected');
  }
}
saveNewName() {
  const formData = {
      tableName: this.selectedTable,
      name: this.newName
  };

  this.http.post('https://localhost:7253/api/Defination/AddName', formData).subscribe({
      next: (response) => {
          this.selectedTable = null;
          this.newName = '';
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Data saved successfully'});
          this.router.navigate(['/detail']).then(() => {
            window.location.reload();
          });
      },
      error: (error) => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'There was an error saving the data'});
          console.error('Error:', error);
      }
  });
}
ngOnInit() {
  this.defination = [
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
}
