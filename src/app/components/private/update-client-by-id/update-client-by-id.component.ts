import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/authService/auth.service';
import { AlertService } from '../../../services/alert/alert.service';

@Component({
  selector: 'app-update-client-by-id',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-client-by-id.component.html',
  styleUrl: './update-client-by-id.component.css'
})
export class UpdateClientByIdComponent implements OnInit {
  private clientId: any = ''
  userId: any = ''
  messageSuccessfully: string = ""
  clientData: any
  clientDataToUpdate: any
  formClient: FormGroup;
  messageErrorForGetClientById: string = ""
  messageErrorForUpdateClient: string = ""
  constructor(private apiService: ApiService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private authService: AuthService, private alertService: AlertService) {
    this.formClient = this.fb.group({
      name: ["", Validators.required],
      lastname: ["", Validators.required],
      age: [0, Validators.required],
      address: ["", Validators.required],
      phone: ["", Validators.required],
      vehicleBrand: ["", Validators.required],
      vehicleModel: ["", Validators.required],
      mileage: ["", Validators.required]
    })
  }
  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get("clientId")
    this.userId = this.authService.getUserId()
    this.apiService.getClientById(this.clientId).subscribe(
      (data) => {
        this.clientData = data
        
      },
      (error) => {
        this.messageErrorForGetClientById = error;
        
      }
    )
    this.loadClientData()
  }
  loadClientData() {
    this.apiService.getClientById(this.clientId).subscribe(client => {
      this.formClient.patchValue(client)
    })
  }
  updateData() {
    this.clientDataToUpdate = this.formClient.value
    this.apiService.updateClient(this.clientId, this.clientDataToUpdate).subscribe(
      () => {
        this.messageSuccessfully = "Cliente actualizado con éxito"
        this.alertService.alert(this.messageSuccessfully)
        this.router.navigate([`dashboard/${this.userId}/clients`])
      },
      error => {
        this.messageErrorForUpdateClient = error;
      }
    )
  }
}
