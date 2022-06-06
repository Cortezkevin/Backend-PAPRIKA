import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { ResponseMessage } from '../models/response-message';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  //categoryURL = "http://localhost:3000/api/v1/category"; //local service
  categoryURL = "https://app-tienda-paprika.herokuapp.com/api/v1/category"; 

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.categoryURL);
  }

  public detail(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.categoryURL}/${id}`);
  }

  public save(category: Category | undefined): Observable<ResponseMessage> {
    return this.httpClient.post<ResponseMessage>(this.categoryURL, category);
  }

  public update(category: Category | undefined): Observable<any> {
    return this.httpClient.put<any>(this.categoryURL, category);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.categoryURL}/${id}`);
  }
}
