import { Injectable } from '@angular/core';
import { AuthService } from '../authService/auth.service';
import {CanActivate,Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate():boolean {
    if(this.authService.isAuthenticated()){
      return true //si el servicio es verdadero, permite navegar
    } else {
      this.router.navigate(["/login"]) //redirige
      return false //sino, no permite navegar
    }
  }
}
