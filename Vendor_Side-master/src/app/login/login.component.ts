import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginDataService } from './login-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _loginData: LoginDataService, private _router: Router) { }
  loginForm: FormGroup;
  flag: boolean = true;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      vendor_email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(15)])
    });
  }

  onLogin() {
    if (this.loginForm.get('vendor_email') != null) {
      this._loginData.loginData(this.loginForm.value).subscribe(
        (data: any[]) => {
          console.log(data);
          if (data.length == 1) {
            alert("valid");
            localStorage.setItem('vendor_email', this.loginForm.get('vendor_email').value);
            this._router.navigate(['/nav'])
          }
          else {
            alert("invalid");
          }
        }
      );
    }
    else {
      alert('uname or password must not be empty');
    }
  }

  forgotPassword(){
    this._router.navigate(['/forgetpassmail']);
  }
}

