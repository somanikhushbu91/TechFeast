import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DialogforlogoutComponentComponent } from '../dialogforlogout-component/dialogforlogout-component.component';
import { MatDialog } from '@angular/material/dialog';
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
    this.email_id=localStorage.getItem('email_id');
  }

  onLogoutClick(){
    this._dialog.open(DialogforlogoutComponentComponent);
  }

  onviewProfile(){
    this._dialog.open(ViewProfileComponent);
  }
}
