import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { menuData } from './menuitem';

@Injectable({
  providedIn: 'root'
})
export class MenuitemserService {
  url:string="http://localhost:3000/menu/";
  url1:string="http://localhost:3000/category/";
  url2:string="http://localhost:3000/menucatname/";
  url3:string="http://localhost:3000/menurange/";
  url4:string="http://localhost:3000/menuasc/";
  url5:string="http://localhost:3000/menudesc/";
  url6:string="http://localhost:3000/menupriceasc/";
  url7:string="http://localhost:3000/menupricedesc/";
  url8:string="http://localhost:3000/homeSlider1/";
  url9:string="http://localhost:3000/homeSlider2/";
  url10:string="http://localhost:3000/menuWithName/"
  highestselling:string="http://localhost:3000/highestsellingitem/";
  constructor(private _http:HttpClient) { }

  getAllData()
  {
    return this._http.get<menuData[]>(this.url);
  }
  getAllCategoryData(){
    return this._http.get(this.url1);
  }
  getDataByCategory(cat_id:number){
    return this._http.get(this.url2+cat_id);
  }
  getDataByRange(item){
    console.log(item);
    return this._http.post(this.url3,item);
  }
  getDataByAssending(){
    return this._http.get(this.url4);
  }
  getDataByDecending(){
    return this._http.get(this.url5);
  }
  getDataByPriceAsc(){
    return this._http.get(this.url6);
  }
  getDataBYPriceDesc(){
    return this._http.get(this.url7);
  }
  getDataForSlider1(){
    return this._http.get(this.url8);
  }
  getDataForSlider2(){
    return this._http.get(this.url9);
  }
  getDataByMenuName(name:string){
    console.log(name);
    return this._http.get(this.url10+name)
  }
}








