import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  baseUrl: string = "https://localhost:7268/api/";
  constructor(private http: HttpClient) { }


  // getJobLocation() {
  //   // this.http.get<any>(this.baseUrl +"JobDetails/GetJobLocation");
  //   this.http.get<any>(`${this.baseUrl}JobDetails/GetJobLocation`);
  // }

   getJobLocation() {
    return this.http.get<[]>(`${this.baseUrl}JobDetails/GetJobLocation`);
  }
}
