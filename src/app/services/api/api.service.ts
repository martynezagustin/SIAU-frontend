import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string = "http://localhost:3000"
  constructor(private httpClient: HttpClient) { }
  getClients(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/clients`)
  }
  addClient(name: string, lastname: string, age: number, address: string, vehicleBrand: string, vehicleModel: string): Observable<any> {
    const body = { name, lastname, age, address, vehicleBrand, vehicleModel }
    const token = localStorage.getItem("token")
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `${token}`
    })
    return this.httpClient.post(`${this.baseUrl}/add-client`, body, { headers })
  }
}
