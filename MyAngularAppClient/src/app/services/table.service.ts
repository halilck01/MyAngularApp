// table.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  constructor(private http: HttpClient) {}

  getNames(tableName: string): Observable<string[]> {
    return this.http.get<string[]>(`https://localhost:7000/api/Defination/GetNames/GetNames/${tableName}`);
  }
}