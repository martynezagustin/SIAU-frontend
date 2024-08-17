import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/authService/auth.service';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';

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
  messageForIncorrectCurrentPassword: any = ""
  constructor(private fb: FormBuilder, private authService: AuthService, private route: ActivatedRoute){
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
    this.authService.updatePasswordUser(this.userId, this.formChangePassword.value).subscribe(
    () => {
        this.messageSuccessfully = "Contraseña actualizada con éxito."
        this.messageForIncorrectCurrentPassword = ""
      },
      err => {
        console.error(err);
        this.messageForIncorrectCurrentPassword = err.error.message
        this.messageSuccessfully = ""
      }
    )
  }
}
