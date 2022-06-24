import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pro } from './product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url:string="http://localhost:3000/product/";
  constructor(private _http:HttpClient) { }
  getAllData()
  {
    return this._http.get<pro[]>(this.url);
  }
  addData(item)
  {
    return this._http.post<pro[]>(this.url,item)
  }
}
