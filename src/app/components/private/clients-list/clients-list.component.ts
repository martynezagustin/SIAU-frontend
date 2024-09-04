import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { DatePipe } from '@angular/common';
import { ConfirmationService } from '../../../services/confirmation/confirmation.service';
import { AlertService } from '../../../services/alert/alert.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/authService/auth.service';
import { Client } from '../../../interfaces/client';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './clients-list.component.html',
  providers: [DatePipe],
  styleUrl: './clients-list.component.css'
})
export class ClientsListComponent implements OnInit {
  clients: Client[] = []
  reforms: any = []
  filteredClients: Client[] = []
  userId: string | null = ''
  filterByDate: Boolean = false
  messageErrorForGetClients: string = ""
  messageSuccessfullyForDeleteClient: string = ""
  messageErrorForDeleteClient: string = ""
  constructor(private apiService: ApiService, private confirmationService: ConfirmationService, private alertService: AlertService, private authService: AuthService) { }
  ngOnInit(): void {
    this.apiService.getClients().subscribe(
      response => {
        this.clients = response
        this.filteredClients = response
      },
      error => {
        this.messageErrorForGetClients = error;

      }
    )
    this.userId = this.authService.getUserId()
  }
  onKey(event: any): void {
    const searchTerm = event.target.value.toLowerCase()
    this.filteredClients = this.clients.filter(c =>
      c.name.toLowerCase().includes(searchTerm) ||
      c.lastname.toLowerCase().includes(searchTerm)
    )
  }
  toggleFilter():void {
    this.filterByDate = !this.filterByDate
    if(this.filterByDate){
      this.filteredClients = [...this.clients].sort((a,b) => {//sort ordena
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()
        return dateB - dateA
      })
    } else {
      this.onKey({target: {value: ''}})
    }
  }
  deleteClient(clientId: string, event: Event) {
    this.confirmationService.confirm("¿Está seguro que desea eliminar al cliente?").then((confirmed) => {
      if (confirmed) {
        this.apiService.deleteClient(clientId).subscribe(
          response => {
            this.messageSuccessfullyForDeleteClient = response.message
            this.messageErrorForDeleteClient = ""
            this.clients = this.clients.filter(c => c._id !== clientId)
            this.filteredClients = this.filteredClients.filter(c => c._id !== clientId)
          },
          err => {
            this.messageErrorForDeleteClient = err.message
            this.messageSuccessfullyForDeleteClient = ""
          }
        )
      }
    })

  }
}
