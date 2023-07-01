import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, map, of } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginModel } from '../models/loginModel';
import { UserDetail } from '../models/userDetail';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  currentUserDetail: UserDetail | null = null;

  previousPath = '';

  constructor(private http: HttpClient, private router: Router) {}

  getCurrentUserDetail() {
    if (this.currentUserDetail) {
      return of(this.currentUserDetail);
    }

    return this.http
      .get<UserDetail>(`${this.baseUrl}/account/current-user-detail`)
      .pipe(
        map((response) => {
          this.currentUserDetail = response;
          return response;
        })
      );
  }

  login(model: LoginModel) {
    return this.http.post<User>(`${this.baseUrl}/account/login`, model).pipe(
      map((res: User) => {
        const user = res;
        if (user) {
          this.setCurrentUser(user);
        }
        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('');
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }
}
