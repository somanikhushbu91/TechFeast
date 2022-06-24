import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserauthguardService implements CanActivate {

  canActivate(_active:ActivatedRouteSnapshot,_state:RouterStateSnapshot):boolean{
    if (localStorage.getItem('email_id')!=null){
      return true;
    }
    alert('login first');
    this._router.navigate(['/']);
  }
  constructor(private _router:Router) { }
}
