import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-signupcomponent',
  standalone: false,
  templateUrl: './signupcomponent.html',
  styleUrl: './signupcomponent.css',
})
export class Signupcomponent {

  signupform! : FormGroup;
  constructor(private fb : FormBuilder, private router : Router){

  }

  ngOnInit(): void{
    this.signupform = this.fb.group({
      firstName : ['', Validators.required], 
      lastName : ['', Validators.required], 
      email : ['', Validators.required], 
      userName : ['', Validators.required], 
      password : ['', Validators.required]
    })
  }
}
