import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit() {
  }

  gotohome(){
    if (localStorage.getItem('email_id')==null){
      console.log(localStorage.getItem('email_id'));
      this._router.navigate(['/']);
    }
    this._router.navigate(['/nav']);
  }

}
