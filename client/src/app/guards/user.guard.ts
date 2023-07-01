import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  canActivate(): Observable<boolean> {
    return this.authenticationService.currentUser$.pipe(
      map((user) => {
        if (user && user.role.includes('Admin')) {
          this.router.navigateByUrl('');
          return false;
        }
        return true;
      })
    );
  }

}
