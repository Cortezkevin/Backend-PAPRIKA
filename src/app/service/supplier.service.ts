import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseMessage } from '../models/response-message';
import { Supplier } from '../models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  //supplierURL = "http://localhost:3000/api/v1/supplier"; //local service
  supplierURL = "https://app-tienda-paprika.herokuapp.com/api/v1/supplier"; 

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Supplier[]> {
    return this.httpClient.get<Supplier[]>(this.supplierURL);
  }

  public detail(id: number): Observable<Supplier> {
    return this.httpClient.get<Supplier>(`${this.supplierURL}/${id}`);
  }

  public save(supplier: Supplier): Observable<ResponseMessage> {
    return this.httpClient.post<ResponseMessage>(this.supplierURL, supplier);
  }

  public update(supplier: Supplier): Observable<any> {
    return this.httpClient.put<any>(this.supplierURL, supplier);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.supplierURL}/${id}`);
  }
}
