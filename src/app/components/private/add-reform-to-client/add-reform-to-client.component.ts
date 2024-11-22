import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { Client } from '../../../interfaces/client';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReformService } from '../../../services/private/reform/reform.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/authService/auth.service';
import { response } from 'express';

@Component({
  selector: 'app-add-reform-to-client',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-reform-to-client.component.html',
  styleUrl: './add-reform-to-client.component.css'
})
export class AddReformToClientComponent implements OnInit {
  clientId: any = ''
  userId: any = ''
  clients: Client [] = []
  clientData: any
  formSelect: FormGroup
  messageForErrorToAddReform: string = ""
  constructor(private apiService: ApiService, private fb: FormBuilder, private reformService:ReformService, private router: Router, private authService: AuthService, private route: ActivatedRoute){
    this.formSelect = this.fb.group({
      client: [null],
      reforms: this.fb.array([this.createReform()])
    })
  }
  ngOnInit(): void {
    this.userId = this.authService.getUserId()
    this.clientId = this.route.snapshot.paramMap.get("clientId")
    this.apiService.getClientById(this.clientId).subscribe(
      response => {
        this.clientData = response
      },
      err => {
        console.error(err)
      }
    )
  }
  SortClients(x:any,y:any){
    return x.name.localeCompare(y.name)
  }
  getClientData(clientId:string){
    this.apiService.getClientById(clientId).subscribe(
      response => {
        this.clientData = response

      }
    )
  }
  createReform(): FormGroup {
    return this.fb.group({
      description: ["", Validators.required],
      date: ["", Validators.required],
      amount: [null, Validators.required],
      repairNumber: [null, Validators.required],
      ticketNumber: ["", Validators.required],
      pieces: this.fb.array([])
    });
  }

  addReform(): void {
    this.reforms.push(this.createReform()); // a las reformas les devuelvo un formulario
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
    return this.formSelect.get("reforms") as FormArray;
  }

  getPieces(reformIndex: number): FormArray {
    return this.reforms.at(reformIndex).get("pieces") as FormArray;
  }
  addReformToClient(event:Event){
    event.preventDefault()
    this.reformService.addReform(this.clientId, this.formSelect.value).subscribe(
    (response) => {
      console.log(response);
      
        this.router.navigate([`dashboard/${this.userId}/clients`])
      },
      err=>{
        this.messageForErrorToAddReform=(err);
      }
    )
  }
  back(){
    this.router.navigate([`dashboard/${this.userId}/clients`])
  }
}
