import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UseauthguardserviceService {

  canActivate(_active:ActivatedRouteSnapshot,_state:RouterStateSnapshot):boolean{
    if (localStorage.getItem('vendor_email')!=null){
      return true;
    }
    alert('login first');
    this._router.navigate(['/']);
  }
  constructor(private _router:Router) { }
}
