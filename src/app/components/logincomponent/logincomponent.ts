import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import ValidateForm from '../../helpers/ValidateForm';

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

  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required], 
      password : ['', Validators.required]
    });
  }

  hideShowPass() {
    this.isText = !this.isText; // true 
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onLogin(){
    if(this.loginForm.valid){
      this.auth.login(this.loginForm.value).subscribe({
        next: (res)=> {
          this.loginForm.reset();
          console.log("Login api response", res);
        }, 
        error : (err) => {
          console.log(err);
          alert(err?.error.message);
        }
      })
    }
    else{
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Form is not valid!");
    }
  }
}
