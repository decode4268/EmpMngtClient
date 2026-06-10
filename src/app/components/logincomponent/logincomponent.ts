import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import ValidateForm from '../../helpers/ValidateForm';
import { UserStoreService } from '../../services/user-store.service';
import { ResetPasswordService } from '../../services/reset-password.service';

@Component({
  selector: 'app-logincomponent',
  standalone: false,
  templateUrl: './logincomponent.html',
  styleUrl: './logincomponent.css',
})
export class Logincomponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash'

  public resetPasswordEmail!: string;
  public isValidEmail!: boolean;

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService,
    private router: Router, private userStore: UserStoreService,
    private resetPasswordService: ResetPasswordService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  hideShowPass() {
    this.isText = !this.isText; // true 
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onLogin() {
    debugger
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.loginForm.reset();
          const tokenPayload = this.auth.decodeToken(res.accessToken);
          const userSession = {
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
            fullname: tokenPayload.name, // or URI if using ClaimTypes
            role: tokenPayload.role
          };

          // Save to localStorage
          localStorage.setItem("userSession", JSON.stringify(userSession));
          this.userStore.setFullnameFromStore(tokenPayload.name);
          this.userStore.setRoleFromStore(tokenPayload.role);
          // on success login navigate to the route on component;
          this.router.navigate(['/home']);
          // on success login navigate to the route on component;
          // this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log(err);
          alert(err?.error.message);
        }
      })
    }
    else {
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Form is not valid!");
    }
  }

  checkValidEmail(event: any) {
    const value = event;
    const pattern = /^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,3}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

  confirmToSend() {
    if (this.checkValidEmail(this.resetPasswordEmail)) {
      // api call to send the forget password link to user 

      this.resetPasswordService.sendResetPasswordLink(this.resetPasswordEmail)
        .subscribe({
          next: (resp) => {
            alert("Reset Password link sent to your email!");
            this.resetPasswordEmail = "";
            const closeButton = document.getElementById('closeBtn');
            closeButton?.click();
          },
          error: (err) => {
            alert(err);
            console.log("error ", err);

          }
        })
    }
  }

}
