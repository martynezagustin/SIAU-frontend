import { Component } from '@angular/core';
import { ReformService } from '../../../services/private/reform/reform.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../services/authService/auth.service';

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
  private clientId: any = ''
  userId: any = ''
  constructor(private reformService: ReformService, private route: ActivatedRoute, private datePipe: DatePipe, private router: Router, private authService: AuthService){}
  ngOnInit(){
    const reformId = this.route.snapshot.paramMap.get("reformId")
    this.clientId = this.route.snapshot.paramMap.get("clientId")
    this.userId = this.authService.getUserId()
    
    this.reformService.getReformById(reformId).subscribe(
      response => {
        this.reform = response.reform
      },
      err => {
        console.error(err);
      }
    )
  }
  formatDate(dateString: string) {
    return this.datePipe.transform(dateString, `yyyy-MM-dd`)
  }
  back(){
    this.router.navigate([`dashboard/${this.userId}/reforms-client/${this.clientId}`])
  }
}
