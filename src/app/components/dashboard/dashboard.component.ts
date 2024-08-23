import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/authService/auth.service';
import { NavbarComponent } from '../private/navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  message: string = ""
  user: any
  tokenActivate: Boolean = true
  messageForErrorGetData: string =""
  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router){}
  logout():void{
    this.authService.logout()
  }
  ngOnInit():void{
    const userId = this.route.snapshot.paramMap.get("userId")
    if(userId){
      this.authService.getUserById(userId).subscribe(
        data =>{
          this.user = data
        },
        error => {
         this.messageForErrorGetData = error
        }
      )
    }
    if(!this.getToken()){
      this.router.navigate([`dashboard/${userId}/clients/expired-token`])
    }
  }
  getToken(): Boolean{
    if(this.authService.getUserToken()?.length === 0){
      return false
    } else {
      return true
    }
  }
}
