import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { categoryData } from './category';
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url:string=environment.url+"category/";
  deleteUrl:string=environment.url+"categorydelete/";
  constructor(private _http:HttpClient) { }
  deleteAll(item:number[]){

    let body=JSON.stringify(item);
    let head=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.deleteUrl,body,{headers:head});
  }
  getAllData()
  {
    return this._http.get(this.url);
  }
  getDataById(cat_id:number)
  {
    return this._http.get(this.url+cat_id);
  }
  deleteData(cat_id:number)
  {
    return this._http.delete(this.url+cat_id);
  }
  addData(item)
  {
    return this._http.post(this.url,item);
  }
  updateData(cat_id,item:FormData)
  {
    return this._http.put(this.url+cat_id,item);
  }
}
