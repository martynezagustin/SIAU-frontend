import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Client } from '../../../interfaces/client';
import { ApiService } from '../../../services/api/api.service';
import { error } from 'console';
import { Reform } from '../../../interfaces/reform';
import { DatePipe } from '@angular/common';
import { ReformService } from '../../../services/private/reform/reform.service';
import { ConfirmationService } from '../../../services/confirmation/confirmation.service';
import { formatDateForInput } from '../../../utils/date-util';
import { AlertService } from '../../../services/alert/alert.service';
import { AuthService } from '../../../services/authService/auth.service';

@Component({
  selector: 'app-get-reforms-by-client-id',
  standalone: true,
  imports: [DatePipe, RouterModule],
  providers: [DatePipe],
  templateUrl: './get-reforms-by-client-id.component.html',
  styleUrl: './get-reforms-by-client-id.component.css'
})
export class GetReformsByClientIdComponent implements OnInit {
  clientId: any = ""
  private userId: string | null = ""
  clientData: any;
  reforms: Reform[] = []
  messageErrorForGetReforms: string = ""
  messageErrorForGetUserId: string = ""
  messageErrorForDeleteClient: string = ""
  constructor(private route: ActivatedRoute, private reformService: ReformService, private datePipe: DatePipe, private apiService: ApiService, private confirmationService: ConfirmationService, private alertService: AlertService, private router: Router, private authService: AuthService) { }
  ngOnInit() {
    this.clientId = this.route.snapshot.paramMap.get("clientId")
    this.userId = this.authService.getUserId()
    this.reformService.getReforms(this.clientId).subscribe(
      response => {
        this.reforms = response
        this.reforms.forEach((r) => {
          r.date = formatDateForInput(r.date)
        })

      },
      err => {
        this.messageErrorForGetReforms = err

      }
    )
    this.apiService.getClientById(this.clientId).subscribe(
      response => {
        this.clientData = response

      },
      err => {
        this.messageErrorForGetUserId = err
      }
    )
  }
  back() {
    this.router.navigate([`dashboard/${this.userId}/clients`])
  }
  deleteReform(reformId: string) {
    this.confirmationService.confirm("¿Desea eliminar la reforma?").then((confirmed) => {
      if (confirmed) {
        this.reformService.deleteReform(reformId).subscribe(
          () => {
            this.alertService.alert("Borrado exitoso. Recargue la página (puede usar F5 para esto).")
          },
          err => {
            this.messageErrorForDeleteClient = err;

          }
        )
      }
    })
  }
}
