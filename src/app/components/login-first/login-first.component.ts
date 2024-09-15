import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'login-first',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-first.component.html',
  styleUrl: './login-first.component.css'
})
export class LoginFirstComponent {
  username: string = ""
  password: string = ""
  errorMessage: string = ""
  successfullMessage: string = ""
  loading: boolean = false
  constructor(private authService: AuthService, private router: Router) { }
  login(event: Event): void {
    this.loading = true
    event.preventDefault()
    setTimeout(() => {
      this.authService.loginUser(this.username, this.password).subscribe(
        response => {
          localStorage.setItem("token", response.token)
          localStorage.setItem("userId", response.userId)
          this.router.navigate([`/dashboard/${response.userId}`])
          this.loading = false
        },
        err => {
          this.errorMessage = "Error en las credenciales: incorrectas o inválidas: " + err.message
        }
      )}, 2500);
  }
}
