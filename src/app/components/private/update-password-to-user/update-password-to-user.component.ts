import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/authService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-password-to-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-password-to-user.component.html',
  styleUrl: './update-password-to-user.component.css'
})
export class UpdatePasswordToUserComponent implements OnInit{
  formChangePassword: FormGroup
  userId: any = ""
  messageSuccessfully: any = ""
  messageForError: any = ""
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){
    this.formChangePassword = this.fb.group({
      currentPassword: ["", Validators.required],
      newPassword: ["", Validators.required],
      confirmNewPassword: ["", Validators.required]
    })
  }
  ngOnInit(): void {
    this.userId = this.authService.getUserId()
    
  }
  updatePassword(){
    if(!this.formChangePassword.value.newPassword){
      this.messageForError = "No se ha asignado valor a la nueva contraseña."
    }
    else if(!this.formChangePassword.value.confirmNewPassword){
      this.messageForError = "No has repetido la contraseña."
    }else {

      this.authService.updatePasswordUser(this.userId, this.formChangePassword.value).subscribe(
        () => {
          this.messageSuccessfully = "Contraseña actualizada con éxito."
          this.messageForError = ""
        },
        err => {
          this.messageForError = err.error.message
          this.messageSuccessfully = ""
        }
      )
    }
  }
  back(){
    this.router.navigate([`dashboard/${this.userId}/update-user`])
  }
}
