import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/authService/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Reform } from '../../../interfaces/reform';
import { ReformService } from '../../../services/private/reform/reform.service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-reform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [DatePipe],
  templateUrl: './update-reform.component.html',
  styleUrl: './update-reform.component.css'
})
export class UpdateReformComponent implements OnInit{
  userId: any
  reformId: any
  reform: any
  reformForm: FormGroup
  constructor(private authService: AuthService, private route: ActivatedRoute, private reformService: ReformService, private fb: FormBuilder, private datePipe: DatePipe){
    this.reformForm = this.fb.group({
      description: ["", Validators.required],
      date: ["", Validators.required],
      amount: [null, Validators.required],
      order: [null, Validators.required],
      pieces: this.fb.array([])
    })
  }
  ngOnInit(): void {
    this.userId = this.authService.getUserId()
    this.reformId = this.route.snapshot.paramMap.get("reformId")
    this.reform = this.reformService.getReformById(this.reformId).subscribe(
      response => {
        this.reform = response.reform
        console.log(this.formatDateForInput(this.reform.date));
        
        console.log(this.reform);
        
        this.reformForm.patchValue({
          description:  this.reform.description,
          date: this.formatDateForInput(this.reform.date),
          amount: this.reform.amount,
          order: this.reform.order
        })
      },
      err=> {
        console.error(err);
      }
    )
  }
  formatDateForInput(date:any){
    const parsedDate = new Date(date)
    return this.datePipe.transform(parsedDate, "yyyy-MM-dd")
  }
  get pieces(): FormArray{
    return this.reformForm.get("pieces") as FormArray
  }
  addPiece(piece:any = {}): void{
    this.pieces.push(this.fb.group({
      description: [piece.description || "", Validators.required],
      order: [piece.order || "", Validators.required]
    }))
  }
  setPieces(pieces: any[]){
    pieces.forEach(piece => this.addPiece(piece))
  }
  removePiece(index:number){
    this.pieces.removeAt(index)
  }
  updateReform(){
    this.reformService.updateReform(this.reformId, this.reformForm.value).subscribe(
      response => {
        console.log(response);
      },
      err => {
        console.error(err);
      }
    )
  }
}
