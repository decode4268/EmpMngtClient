import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseUrl: string = 'https://localhost:7268/api/User/';
  userPayload: any;
  // private userPayload : any;
  constructor(private httpClient: HttpClient, private router: Router) {

  }

  signup(userObj: any) {
    return this.httpClient.post<any>(`${this.baseUrl}register`, userObj);
  }

  login(loginObj: any) {
    return this.httpClient.post<any>(`${this.baseUrl}authenticate`, loginObj);
  }

  storeToken(token: string) {
    localStorage.setItem('token', token)
  }

  storeRefreshToken(tokenValue: string) {
    localStorage.setItem('refreshtoken', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshtoken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  
  decodeToken(){
    const jwtHelper = new this.JwtHelperService();
    const token = this.getToken()!; // ! for null check
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  /* Some Confusion here need to clarify in next session 
  */
  getFullNameFromToken(){
    if(this.userPayload){
      return this.userPayload.name;
    }
  }

  getRoleFromToken(){
    if(this.userPayload){
      return this.userPayload.role;
    }
  }

}
