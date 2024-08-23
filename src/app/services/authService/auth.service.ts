import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = "http://localhost:3000"
  user: any
  private token: string |null = ''

  constructor(private httpClient: HttpClient, private router: Router) { }
  private getHeaders(): HttpHeaders{
    const token = localStorage.getItem("token")
    return new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `${token}`
    })
  }
  loginUser(username: string, password: string): Observable<any> {
    const body = { username, password }
    return this.httpClient.post<any>(`${this.baseUrl}/login`, body, {headers: this.getHeaders()})
  
  }
  logout():void{
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    this.router.navigate(["/login"])
  }
  isAuthenticated(): boolean{
    return localStorage.getItem("token") !== null
  }
  getUserDataById(userId:any):Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}/dashboard/${userId}`, {headers: this.getHeaders()})
  }
  getUserId(){
    return localStorage.getItem("userId")
  }
  getUserToken(){
    if(!this.token){
      this.token = localStorage.getItem("token")
    }
    return this.token
  }
  updateUser(userId:any, userData: any){
    return this.httpClient.put<any>(`${this.baseUrl}/update/${userId}`, userData, {headers:this.getHeaders()})
  }
  updatePasswordUser(userId:any, userData:any){
    return this.httpClient.put<any>(`${this.baseUrl}/update-password/${userId}`, userData, {headers:this.getHeaders()})
  }
  getUserById(userId: string){
    userId = userId.replace(/[^a-zA-Z0-9]/g, '');
    return this.httpClient.get(`${this.baseUrl}/dashboard/${userId}`, {headers:this.getHeaders()})
  }
}
