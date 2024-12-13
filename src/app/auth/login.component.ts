import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, RequiredValidator, UntypedFormGroup, Validators } from '@angular/forms';
import { LoginRequest } from './login-request';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from './auth.service';
import { LoginResponse } from './login-response';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterLink,
    MatInputModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
onSubmit(): void {
  var loginRequest: LoginRequest = {
    userName: this.form.controls["userName"].value,
    password: this.form.controls["password"].value
  }
  var loginResponse: LoginResponse;
  this.authService.login(loginRequest).subscribe(
    {
      next: result => 
        {
          loginResponse = result;
          console.log(loginResponse);
          if (result.success) {
            localStorage.setItem("veryImportantToken", result.token);
            this.router.navigate(["/"]);
          }
        },
      error: e => console.error(e)
    }
  )
}
ngOnInit(): void {
  this.form = new FormGroup({
    userName: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });
}
  form!: UntypedFormGroup;
  constructor(private authService: AuthService, private router: Router){

  }
}