import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './clients-list.component.html',
  providers: [DatePipe],
  styleUrl: './clients-list.component.css'
})
export class ClientsListComponent implements OnInit{
  clients: any = []
  reforms: any = []
  constructor(private apiService: ApiService, private datePipe:DatePipe){}
  ngOnInit(): void {
    this.apiService.getClients().subscribe(
      response =>{
        this.clients = response
        console.log(response);
      },
      error =>{
        console.error(error);
        
      }
    )
  }
  trackByReform(index:number, reform:any){
    return reform._id
  }
  formatDate(dateString: string){
    return this.datePipe.transform(dateString, "short")
  }
}
