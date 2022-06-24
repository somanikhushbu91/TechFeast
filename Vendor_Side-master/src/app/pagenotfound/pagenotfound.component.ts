import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  gotohome(){
    if (localStorage.getItem('vendor_email')==null){
      console.log(localStorage.getItem('vendor_email'));
      this._router.navigate(['/']);
    }
    this._router.navigate(['/nav']);
  }

}
