import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/authService/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit {
  userId: any = ""
  userData: any
  formUser: FormGroup
  userDataToUpdate: any
  messageSuccessfully: any
  messageErrorForInvalidCurrentPassword: any
  messageErrorForGetUserDataByClientById: string = ""
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.formUser = this.fb.group({
      name: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      username: ["", Validators.required],
      currentPassword: ["", Validators.required],
    })
  }
  ngOnInit(): void {
    this.userId = this.authService.getUserId()
    this.authService.getUserDataById(this.userId).subscribe(
      (user) => {
        this.formUser.patchValue({
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          username: user.username,
          currentPassword: "",
        })
      },
      err => {
        this.messageErrorForGetUserDataByClientById = err;
      }
    )
  }
  updateUser() {
    this.userDataToUpdate = this.formUser.value
    this.authService.updateUser(this.userId, this.userDataToUpdate).subscribe(
      () => {
        this.messageSuccessfully = "Usuario actualizado con éxito."
        this.messageErrorForInvalidCurrentPassword = ''
      },
      err => {
        this.messageErrorForInvalidCurrentPassword = "La contraseña no es correcta, vuelve a intentarlo."
        this.messageSuccessfully = ''
      }
    )
  }
}
