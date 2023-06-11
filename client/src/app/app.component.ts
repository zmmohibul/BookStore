import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.setUser();
  }

  setUser() {
    const userString = localStorage.getItem('user');
    if (!userString) {
      return;
    }

    const user: User = JSON.parse(userString);
    this.authService.setCurrentUser(user);
  }
}
