import { Component } from '@angular/core';
import { ReformService } from '../../../services/private/reform/reform.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../services/authService/auth.service';
import { formatDateForInput } from '../../../utils/date-util';

@Component({
  selector: 'app-info-reform',
  standalone: true,
  imports: [DatePipe, RouterModule],
  providers: [DatePipe],
  templateUrl: './info-reform.component.html',
  styleUrl: './info-reform.component.css'
})
export class InfoReformComponent {
  reform: any
  clientId: string | null = ''
  userId: string | null = ''
  messageErrorForGetReformById: string = ""
  constructor(private reformService: ReformService, private route: ActivatedRoute, private router: Router, private authService: AuthService){}
  ngOnInit(){
    const reformId = this.route.snapshot.paramMap.get("reformId")
    this.clientId = this.route.snapshot.paramMap.get("clientId")
    this.userId = this.authService.getUserId()
    
    this.reformService.getReformById(reformId).subscribe(
      response => {
        this.reform = response.reform
        this.reform.date = formatDateForInput(this.reform.date)
      },
      err => {
        this.messageErrorForGetReformById = err;
      }
    )
  }
  formatDateForInput(dateString: string) {
    const parsedDate = new Date(dateString)
    return parsedDate.toISOString().split("T")[0]
  }
  back(){
    this.router.navigate([`dashboard/${this.userId}/reforms-client/${this.clientId}`])
  }
}
