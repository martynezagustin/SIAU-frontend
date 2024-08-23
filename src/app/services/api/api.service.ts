import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../interfaces/client';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string = environment.apiUrl
  constructor(private httpClient: HttpClient) { }
  private getHeaders():HttpHeaders{
    const token = localStorage.getItem("token")
    return new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `${token}`
    })
  }
  getClients(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/clients`, {headers:this.getHeaders()})
  }
  addClient(clientForm: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/add-client`, clientForm, {headers:this.getHeaders()})
  }
  deleteClient(clientId: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/delete-client/${clientId}`, {headers:this.getHeaders()})
  }
  updateClient(clientId: string, clientData: any): Observable<any>{
    return this.httpClient.put(`${this.baseUrl}/update-client/${clientId}`, clientData, {headers:this.getHeaders()})
  }
  getClientById(clientId:string){
    return this.httpClient.get(`${this.baseUrl}/${clientId}`, {headers:this.getHeaders()})
  }
}
