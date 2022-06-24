import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DialogforlogoutComponent } from '../dialogforlogout/dialogforlogout.component';
import { ViewProfileComponent } from '../view-profile/view-profile.component';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    email_id:String='';
  constructor(private breakpointObserver: BreakpointObserver,private _dialog:MatDialog) {}

  ngOnInit(){
    this.email_id=localStorage.getItem('vendor_email');
  }

  onLogoutClick(){
    this._dialog.open(DialogforlogoutComponent);
  }

  onviewProfile(){
    this._dialog.open(ViewProfileComponent);
  }

}
