import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) {}

  canActivate(): Observable<boolean> {
    return this.authenticationService.currentUser$.pipe(
      map((user) => {
        if (!user) {
          this.toastr.error('Ekhane jawa jabe na');
          return false;
        }
        if (!user.role.includes('Admin')) {
          this.toastr.error('Ekhane jawa jabe na');
          return false;
        }
        return true;
      })
    );
  }
}
