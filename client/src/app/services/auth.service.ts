import { Injectable } from '@angular/core';
import {BehaviorSubject, map} from 'rxjs';
import { User } from '../models/user';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {LoginModel} from "../models/loginModel";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  login(model: LoginModel) {
    return this.http.post<User>(`${this.baseUrl}/auth/login`, model).pipe(
      map((res: User) => {
        const user = res;
        if (user) {
          this.setCurrentUser(user);
        }
      }),
    );
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }
}
