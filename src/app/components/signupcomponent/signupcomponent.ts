import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import ValidateForm from '../../helpers/ValidateForm';

@Component({
  selector: 'app-signupcomponent',
  standalone: false,
  templateUrl: './signupcomponent.html',
  styleUrl: './signupcomponent.css',
})
export class Signupcomponent implements OnInit{

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash'

  signupform!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    this.signupform = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


  hideShowPass() {
    this.isText = !this.isText; // true 
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSubmit() {
    // const signupFormValue = this.signupform.value;
    // console.log(signupFormValue);
    if (this.signupform.valid) {
      console.log('Save Data', this.signupform.value);
      this.authService.signup(this.signupform.value).subscribe({
        next: (res) => {
          alert(res.message) // Use model popup to show the response msg.
          this.signupform.reset(); 
          this.router.navigate(['login']);
        },
        error: (err) => {
          alert(err?.error.message);
        }
      })
    } else {
      // alert('Form field is not valid!!');
      console.log('Form is not valid');
      ValidateForm.validateAllFormFields(this.signupform);
    }

  }
}
