import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //formgroup
  signupForm: FormGroup;

  //variables
  city = [
    "Ahmedabad",
    "Baroda",
    "Surat",
    "Rajkot",
    "Jamnagar"
  ];
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    //validators
    this.signupForm = this.formBuilder.group({
      ownerName: ["", Validators.required],
      resName: ["", Validators.required],
      city: ["", Validators.required],
      address: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      mobile: ["", Validators.required]
    })
  }

  // convience getter to easy access form field
  get form() {
    return this.signupForm.controls;
  }

  //on register
  onSubmit() {
    this.isSubmitted = true;

    if (this.signupForm.invalid) {
      return;
    }


  }
}
