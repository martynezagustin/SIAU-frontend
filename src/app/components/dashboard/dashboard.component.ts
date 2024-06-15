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
  constructor(private authService: AuthService, private route: ActivatedRoute){}
  logout():void{
    this.authService.logout()
  }
  ngOnInit():void{
    const userId = this.route.snapshot.paramMap.get("userId")
    if(userId){
      this.authService.getUserData(userId).subscribe(
        data =>{
          console.log(data);
          this.user = data
        },
        error => {
         console.error(error);
        }
      )
    }
  }
}
