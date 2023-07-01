import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { LoginModel } from '../../models/loginModel';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  model: LoginModel = { userName: '', password: '' };
  loading = false;

  constructor(
    public authService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  login() {
    this.loading = true;
    this.authService.login(this.model).subscribe({
      next: (user: User) => {
        if (user.role == 'Admin') {
          this.router.navigateByUrl('admin');
        } else {
          let path = this.authService.previousPath;
          this.authService.previousPath = '';
          this.router.navigateByUrl(path);
        }
        this.loading = false;
      },
      error: (err) => {
        this.toastr.error(err.error.errorMessage);
        this.loading = false;
      },
    });
  }
}
