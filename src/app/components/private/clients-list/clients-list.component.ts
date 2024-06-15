import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [],
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.css'
})
export class ClientsListComponent implements OnInit{
  clients: any = []
  constructor(private apiService: ApiService){}
  ngOnInit(): void {
    this.apiService.getClients().subscribe(
      response =>{
        this.clients = response
      },
      error =>{
        console.error(error);
        
      }
    )
  }
}
