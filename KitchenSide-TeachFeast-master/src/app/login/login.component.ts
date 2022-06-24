import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDataServiceService } from './login-data-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _loginData:LoginDataServiceService,private _router:Router) { }
  loginForm:FormGroup;
  flag:boolean=true;
  ngOnInit(){
    this.loginForm=new FormGroup({
      email_id:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required,,Validators.minLength(8),Validators.maxLength(15)])
    });
  }

  onLogin()
  {
    if (this.loginForm.get('email_id') != null){
    this._loginData.loginData(this.loginForm.value).subscribe(
      (data:any[])=>{
        console.log(data);
        if (data.length==1)
        {
          alert("valid");
          localStorage.setItem('email_id',this.loginForm.get('email_id').value);
          this._router.navigate(['/nav']);
        }
        else{
          alert("invalid");
        }
      }
    );
  }
  else{
    alert('uname or password must not be empty');
  }

}
forgotPassword()
{
  this._router.navigate(['/forgetpassmail']);
  console.log('hello');
}

}
