import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit() {
  }
  onGoToShop(){
    this._router.navigate(['/shop']);
  }
  // onVideo()
  // {
  //   this._router.navigate(['/video']);
  // }
}
