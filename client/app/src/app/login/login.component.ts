import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AuthenticationService} from '../_services/authentication.service';
import {Role} from "../_models/role";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ["./login.component.css"]
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      phone_number: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f['phone_number'].value, this.f['password'].value)
      .pipe(first())
      .subscribe({
        next: () => {
          if (this.authenticationService.userValue.type == Role.User){
            const _id = this.authenticationService.userValue._id
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/DoctorProfile/' + _id;
            this.router.navigateByUrl(returnUrl);
          }
           else {
             const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigateByUrl(returnUrl);
           }
          // get return url from query parameters or default to home page
        },
        error: error => {
          console.log(error)
          this.error = "Failed To Login Incorrect Phone Number or Password ";
          this.loading = false;
        }
      });
  }
}
