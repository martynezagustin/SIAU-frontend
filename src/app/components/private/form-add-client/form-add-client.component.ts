import { Component } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-add-client',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-add-client.component.html',
  styleUrl: './form-add-client.component.css'
})
export class FormAddClientComponent {
  name: string = ""
  lastname: string = ""
  age: number = 0
  address: string = ""
  vehicleBrand: string = ""
  vehicleModel: string = ""
  constructor(private apiService: ApiService){}
  addClient(event: Event):void{
    event.preventDefault()
    this.apiService.addClient(this.name, this.lastname, this.age, this.address, this.vehicleBrand, this.vehicleModel).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error(error);
      }
    )
  }
}
