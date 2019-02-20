import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from './registration.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],

})

// component that handles user registration
export class RegistrationComponent implements OnInit {

  constructor(private fb: FormBuilder, private registrationService: RegistrationService, private router: Router) { }

  registrationForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
    email: [null, Validators.required]
  });

  hasUnitNumber = false;
  error = false;


  ngOnInit() {
  }

  onSubmit() {
    this.registrationService.registration(this.registrationForm.value, "student").subscribe((response)=>{
        this.error = false;
        console.log(response);
    },
    error => {
      console.log(this.registrationForm.value);
      this.error = true;
      console.log(error)
    });

  }

}