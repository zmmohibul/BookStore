import { Component } from '@angular/core';
import {User} from "../models/user";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  user: User | null = null;

  constructor(private authService: AuthService) {
    this.authService.currentUser$.subscribe({
      next: (user) => this.user = user
    });
  }
}
