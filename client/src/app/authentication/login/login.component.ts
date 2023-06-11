import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { LoginModel } from '../../models/loginModel';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  model: LoginModel = { userName: '', password: '' };

  constructor(
    public authService: AuthenticationService,
    private router: Router
  ) {}

  login() {
    this.authService.login(this.model).subscribe({
      next: (user: User) => {
        if (user.role == 'Admin') {
          this.router.navigateByUrl('admin');
        } else {
          this.router.navigateByUrl('');
        }
      },
    });
  }
}
