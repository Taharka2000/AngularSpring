import { Injectable } from '@angular/core';
import { User } from '../../Models/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { apiURLogin } from '../../config';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public roles!: string[];
  token!: string;
  private helper = new JwtHelperService();
  constructor(private router: Router, private http: HttpClient) { }
  login(user: User) {
    return this.http.post<User>(`${apiURLogin}/login`, user, {
      observe: 'response',
    });
  }
  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  }
  decodeJWT() {
    if (this.token == undefined) return;
    const decodedToken = this.helper.decodeToken(this.token);
    if (decodedToken) {
      this.roles = decodedToken.roles;
      this.loggedUser = decodedToken.sub;
    }
  }
  // loadToken() {
  //   this.token = localStorage.getItem('jwt');
  // }
  getToken(): string {
    return this.token;
  }
  loadToken() {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('jwt');
      if (token) {
        this.token = token;
        this.decodeJWT();
      } else {
        console.log('No token found in localStorage');
      }
    } else {
      console.warn('localStorage is not available');
    }
  }
  getRoles(): string[] {
    return this.roles;
  }
  isAdmin(): Boolean {
    if (!this.roles)
      return false;
    return this.roles.indexOf('ADMIN') >= 0;
  }
  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token = undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }
  isTokenExpired(): Boolean {
    return this.helper.isTokenExpired(this.token);
  }
}
