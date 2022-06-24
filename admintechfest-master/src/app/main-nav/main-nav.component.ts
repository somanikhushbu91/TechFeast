import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogforlogoutComponent } from '../dialogforlogout/dialogforlogout.component';
import { ViewProfileComponent } from '../view-profile/view-profile.component';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    email_id:String='';
  constructor(private breakpointObserver: BreakpointObserver,private _dialog:MatDialog) {}

  ngOnInit(){
    this.email_id=localStorage.getItem('email_id');
  }
  onLogoutClick(){
    this._dialog.open(DialogforlogoutComponent);
  }

  onviewProfile(){
    this._dialog.open(ViewProfileComponent);
  }

}
// flag:boolean=true;
//   EmpID:string;
//   name:string;
//   isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
//     .pipe(
//       map(result => result.matches)
//     );

//   constructor(private breakpointObserver: BreakpointObserver,private _rout:Router,private _Ser:EmployeeSerService) {}
//   onLogout(){
//     this._rout.navigate(['loginpage']);
//     localStorage.setItem('email',"");
//    // this._Ser.isAuthenticated=false;
//   }
//    onviewprofile(){
//       this._rout.navigate(['menu/viewprofile']);
//    }
//    changepass(){
//     this._rout.navigate(['/menu/changepass']);
//    }
//    ngOnInit(){
//      this.name=localStorage.getItem('Name');
//    }
//   }
