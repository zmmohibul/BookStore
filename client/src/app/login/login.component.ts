import { Component } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { AuthService } from '../services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  model: LoginModel = { userName: '', password: '' };

  constructor(public authService: AuthService, private router: Router) {

  }

  login() {
    this.authService.login(this.model).subscribe({
      next: () => this.router.navigateByUrl('')
    })
  }
}
