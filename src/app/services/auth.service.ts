import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseUrl: string = 'https://localhost:7268/api/User/';
  // private userPayload : any;
  constructor(private httpClient: HttpClient, private router: Router) {

  }

  signup(userObj: any) {
    return this.httpClient.post<any>(`${this.baseUrl}register`, userObj);
  }

  login(loginObj: any) {
    return this.httpClient.post<any>(`${this.baseUrl}authenticate`, loginObj);
  }

}
