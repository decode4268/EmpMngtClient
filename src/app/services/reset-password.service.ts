import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  
  private baseUrl: string = 'https://localhost:7268/api/User/';
  constructor(private httpClient: HttpClient) {

  }

  sendResetPasswordLink(email : string){
    return this.httpClient.post<any>(`${this.baseUrl}send-reset-email/${email}`,{})
  }
}
