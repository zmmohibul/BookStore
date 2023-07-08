import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { LoginModel } from '../../models/loginModel';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  model: LoginModel = { userName: '', password: '' };
  loading = false;

  constructor(
    public authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.model = { ...this.loginForm.value };
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
