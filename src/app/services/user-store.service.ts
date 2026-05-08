import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");

  constructor() { }

  public setFullnameFromStore(fullName: string) {
    return this.fullName$.next(fullName);
  }

  public getFullNameFromStore() {
    return this.fullName$.asObservable();
  }
  public getRoleFromStore() {
    return this.role$.asObservable();
  }

  public setRoleFromStore(role: string) {
    this.role$.next(role);
  }
}
