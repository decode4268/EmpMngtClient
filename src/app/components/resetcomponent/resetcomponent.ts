import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPassword } from '../../models/ResetPassword';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from '../../services/reset-password.service';
import { validate } from '@angular/forms/signals';
import { confirmPasswordValidator } from '../../helpers/confirmPasswordValidator';


@Component({
  selector: 'app-resetcomponent',
  standalone: false,
  templateUrl: './resetcomponent.html',
  styleUrl: './resetcomponent.css',
})
export class Resetcomponent implements OnInit {
  resetPasswordForm!: FormGroup;
  emailToReset!: string;
  emailToken !: string;
  resettPasswordObj = new ResetPassword()

  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private resetPasswordService: ResetPasswordService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    }, {
      validator: confirmPasswordValidator("password", "confirmPassword")
    });

    this.activatedRoute.queryParams.subscribe(val => {
      this.emailToReset = val['email'];
      let uriToken = val['code'];
      this.emailToken = uriToken.replace(/ /g, '+');
      console.log(this.emailToReset, this.emailToken);
    })
  }


  onReset() {
    if (this.resetPasswordForm.valid) {
      this.resettPasswordObj.email = this.emailToReset;
      this.resettPasswordObj.newPassword = this.resetPasswordForm.value.password;
      this.resettPasswordObj.emailToken = this.emailToken;

      this.resetPasswordService.resetPassword(this.resettPasswordObj).subscribe({
        next: (res)=> {
          alert("Password Reset Successfully")
          this.router.navigate(['']);
        }, 
        error: (err)=> {
          alert("Something went wrong!")
        }
      })
    }
  }
}
