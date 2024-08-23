import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  userId: string | null = ''
  constructor(private route: ActivatedRoute){}
  ngOnInit(){
    this.userId = this.route.snapshot.paramMap.get("userId")
  }
}
