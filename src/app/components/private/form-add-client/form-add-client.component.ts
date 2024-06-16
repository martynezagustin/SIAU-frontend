import { Component } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-add-client',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './form-add-client.component.html',
  styleUrl: './form-add-client.component.css'
})
export class FormAddClientComponent {
  formClient: FormGroup
  constructor(private apiService: ApiService, private fb: FormBuilder){
    this.formClient = this.fb.group({
      name: ["", Validators.required],
      lastname: ["", Validators.required],
      age: [0, Validators.required],
      address: ["", Validators.required],
      vehicleBrand: ["", Validators.required],
      vehicleModel: ["", Validators.required],
      reforms: ["", Validators.required]
    })
  }
  addClient(event: Event):void{
    event.preventDefault()
    this.apiService.addClient(this.formClient.value).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error(error);
      }
    )
  }
}
