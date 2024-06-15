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

  constructor(private httpClient: HttpClient, private router: Router) { }
  loginUser(username: string, password: string): Observable<any> {
    const body = { username, password }
    const headers = new HttpHeaders({"Content-Type": "application/json"})
    return this.httpClient.post<any>(`${this.baseUrl}/login`, body, {headers})
  
  }
  logout():void{
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    this.router.navigate(["/login"])
  }
  isAuthenticated(): boolean{
    return localStorage.getItem("token") !== null
  }
  getUserData(userId:string):Observable<any>{
    const token = localStorage.getItem("token")
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `${token}`
    })
    return this.httpClient.get<any>(`${this.baseUrl}/dashboard/${userId}`, {headers})
  }
}
