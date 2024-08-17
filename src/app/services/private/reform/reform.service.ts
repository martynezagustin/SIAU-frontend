import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reform } from '../../../interfaces/reform';

@Injectable({
  providedIn: 'root'
})
export class ReformService {

  constructor(private httpClient: HttpClient) {}
  private baseUrl: string = "http://localhost:3000"
  private getHeaders():HttpHeaders{
    const token = localStorage.getItem("token")
    return new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `${token}`
    })
  }
  getReforms(clientId: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/reforms/client/${clientId}`, {headers: this.getHeaders()})
  }
  deleteReform(reformId:string): Observable<any>{
    return this.httpClient.delete(`${this.baseUrl}/clients/reforms/${reformId}`, {headers: this.getHeaders()})
  }
  addReform(clientId:any, reformData: Reform[]): Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/client/${clientId}/reforms`, reformData, {headers:this.getHeaders()})
  }
  getReformById(reformId:any):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/client/reforms/${reformId}`, {headers: this.getHeaders()})
  }
  updateReform(reformId:any, reformData: any):Observable<any>{
    return this.httpClient.put(`${this.baseUrl}/reforms/${reformId}/update`, reformData, {headers: this.getHeaders()})
  }
}
