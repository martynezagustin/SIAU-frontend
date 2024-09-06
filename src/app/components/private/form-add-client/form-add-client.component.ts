import { Component } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/authService/auth.service';

@Component({
  selector: 'app-form-add-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-add-client.component.html',
  styleUrl: './form-add-client.component.css'
})
export class FormAddClientComponent {
  formClient: FormGroup;
  userId: string | null = ''
  messageSuccessfully: any = ""
  messageError: any = ""
  constructor(private apiService: ApiService, private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.formClient = this.fb.group({
      name: ["", Validators.required],
      lastname: ["", Validators.required],
      age: [0, Validators.required],
      address: ["", Validators.required],
      phone: ["", [Validators.required, Validators.pattern("[0-9 ]{12}")]],
      vehicleBrand: ["", Validators.required],
      vehicleModel: ["", Validators.required],
      mileage: [0, Validators.required],
      reforms: this.fb.array([])
    });
  }

  addClient(event: Event): void {
    this.userId = this.authService.getUserId()
    event.preventDefault();
    this.apiService.addClient(this.formClient.value).subscribe(
      () => {
        this.router.navigate([`dashboard/${this.userId}/clients`])
        this.messageSuccessfully = "Cliente añadido con éxito."
        this.messageError = ""
      },
      error => {
        this.messageError = error.message
      }
    );
  }

  createReform(): FormGroup {
    return this.fb.group({
      description: ["", Validators.required],
      date: ["", Validators.required],
      amount: [0, Validators.required],
      order: [0, Validators.required],
      pieces: this.fb.array([])
    });
  }

  addReform(): void {
    this.reforms.push(this.createReform());
  }

  removeReform(index: number): void {
    this.reforms.removeAt(index);
  }

  createPiece(): FormGroup {
    return this.fb.group({
      description: ["", Validators.required],
      order: [0, Validators.required]
    });
  }

  addPiece(reformIndex: number): void {
    this.getPieces(reformIndex).push(this.createPiece());
  }

  removePiece(reformIndex: number, pieceIndex: number): void {
    this.getPieces(reformIndex).removeAt(pieceIndex);
  }

  get reforms(): FormArray {
    return this.formClient.get("reforms") as FormArray;
  }

  getPieces(reformIndex: number): FormArray {
    return this.reforms.at(reformIndex).get("pieces") as FormArray;
  }
}
