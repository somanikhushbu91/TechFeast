import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { menuData } from './menu';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  url:string=environment.url+"menu/";
  deleteUrl:string=environment.url+"menudelete/";
  url1:string="http://localhost:3000/menu_image/"
  monthlyselling="http://localhost:3000/monthlyselling/";
  stockmenu:string="http://localhost:3000/stockmenu/"
  stockmenudelete:string="http://localhost:3000/stockmenudelete/"

  constructor(private _http:HttpClient) { }
  deleteAll(item:number[]){

    let body=JSON.stringify(item);
    let head=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.deleteUrl,body,{headers:head});
  }
  getAllData()
  {
    return this._http.get<menuData[]>(this.url);
  }
  getDataById(menu_id:number)
  {
  return this._http.get(this.url+menu_id);
  }
  deleteData(menu_id:number)
  {
    return this._http.delete(this.url+menu_id);
  }
  addData(item){
    console.log(item.getAll('name'));
    return this._http.post(this.url,item);
  }
  updateData(menu_id,item:FormData){
    var obj={};
    item.forEach(function(value,key){
      obj[key]=value;
    })
    let body=JSON.stringify(obj);
    let header=new HttpHeaders().set('Content-type','application/json');
    return this._http.put(this.url+menu_id,body,{headers:header});
  }
  updateImage(menu_id,item){
    // let body=JSON.stringify(item);
    // let header=new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url1+menu_id,item);
  }

  MonthlySellingCategoryWise()
  {
    return this._http.get(this.monthlyselling);
  }
  addStockMenu(item){
    return this._http.post(this.stockmenu,item);
  }
  getStockMenuByID(menu_id){
    console.log(menu_id);
    return this._http.get(this.stockmenu+menu_id);
  }
  updateStock(sm_id,item)
  {
    console.log(sm_id);
    console.log(item);
    let body=JSON.stringify(item);
    let header=new HttpHeaders().set('Content-type','application/json');
    return this._http.put(this.stockmenu+sm_id,body,{headers:header});
  }
  deleteAllStockMenu(item:number[]){

    let body=JSON.stringify(item);
    let head=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.stockmenudelete,body,{headers:head});
  }
 }
