import { Component, OnInit } from '@angular/core';
import { MenuitemserService } from './menuitemser.service';
import { menuData } from './menuitem';
import { cartDetail } from '../cart/cartDetail';
import { CartDataService } from '../cart/cart-data.service';
import { Cart } from '../cart/cart';
import { Router } from '@angular/router';
import { pricerange } from './menu';

@Component({
  selector: 'app-menuitem',
  templateUrl: './menuitem.component.html',
  styleUrls: ['./menuitem.component.css']
})
export class MenuitemComponent implements OnInit {

  constructor(private _menuser:MenuitemserService,private _cartService:CartDataService,private _router:Router) { }

  menu:menuData[]=[];
  category:any[]=[];
  cartProductItem:menuData=null;
  currentCartItem:cartDetail=null;
  searchName:string;
  SubTotal:number=0;
  GrandTotal:number=0;

  ngOnInit() {
    this._menuser.getAllData().subscribe(
      (data:menuData[])=>{
        console.log(data);
        this._menuser.getAllCategoryData().subscribe(
          (data:any[])=>{
            this.category=data;
          }
        );
        console.log(data);
        this.menu=data;
      }
    );
  }

  getDataBycategory(item){
    console.log(item);
    let x=item.cat_id;
    this._menuser.getDataByCategory(x).subscribe(
      (data:any[])=>{
        this.menu=data;
      }
    );
}

  QuickView_image:string='';
  QuickView_MenuName:string='';
  QuickView_Price :number=0;
  QuickView_Description:string='';
  QuickView_Ingredients:string='';
  QuickView_cat_id:number=0;
  QuickView_is_jain:string='';
  QuickView_is_available:string='';
  Quick_menu_id:number=0;

onQuickView(item:menuData){
  console.log(item);
  this.QuickView_image = item.pic;
  this.QuickView_MenuName = item.name;
  this.QuickView_Ingredients = item.ingredients;
  this.QuickView_Description = item.discription;
  this.QuickView_Price = item.price;
  this.QuickView_cat_id=item.fk_cat_id;
  this.QuickView_is_jain=item.is_jain;
  this.QuickView_is_available=item.is_available;
  this.Quick_menu_id=item.menu_id;
}

onAddToCartQuickView(){
   let obj:menuData = new menuData(this.Quick_menu_id,this.QuickView_MenuName,this.QuickView_Description,this.QuickView_Price,this.QuickView_cat_id,this.QuickView_is_jain,this.QuickView_is_available,this.QuickView_Ingredients,this.QuickView_image);
   console.log(obj);
  this.onAddToCart(obj);
}


  onAddToCart(item:menuData){
    this.cartProductItem=item;
    this.SubTotal=this._cartService.doSubTotal(this.cartProductItem.price,1);
    this.currentCartItem=new cartDetail(this.cartProductItem,1,this.SubTotal);

    if (localStorage.getItem('cart')==null){
      const cartItems:cartDetail[] = [];
      cartItems.push(this.currentCartItem);
      this.GrandTotal=this._cartService.doGrandTotal(cartItems);

      const mycart=new Cart(cartItems,this.GrandTotal);

      localStorage.setItem('cart',JSON.stringify(mycart));
    }
    else{
      const cart:Cart=JSON.parse(localStorage.getItem('cart')) as Cart;
      let index:number = -1;

      //getting index of product
      if (cart.CartItems.length>=0){
        index=cart.CartItems.map(function(x){
          return x.menuItem.menu_id;
        }).indexOf(item.menu_id);

      // if current product does not exist in cart then add it
      if (index==-1){
        cart.CartItems.push(this.currentCartItem);
        cart.GrandTotal=this._cartService.doGrandTotal(cart.CartItems);

        localStorage.setItem('cart',JSON.stringify(cart));
      }

        else{
          const cartItem:cartDetail=cart.CartItems[index];
          cartItem.Quantity+=1;
          cartItem.SubTotal=this._cartService.doSubTotal(this.cartProductItem.price,cartItem.Quantity);

          cart.CartItems[index]=cartItem;
          cart.GrandTotal=this._cartService.doGrandTotal(cart.CartItems);

          localStorage.setItem('cart',JSON.stringify(cart));
        }
      }
      alert("Successfully Addded to cart");
      //this._router.navigate(['/cart']);
    }
  }

  goToGridView(){
    this._router.navigate(['/shop']);
  }

  goToListView(){
    this._router.navigate(['/listview']);
  }

  onChange(deviceValue) {
    if (deviceValue==1){
      this._menuser.getAllData().subscribe(
        (data:any)=>{
          this.menu=data;
        }
      );
    }
    else if (deviceValue==2){
      this._menuser.getDataByAssending().subscribe(
        (data:any)=>{
          this.menu=data;
        }
      );
    }
    else if(deviceValue==3){
      this._menuser.getDataByDecending().subscribe(
        (data:any)=>{
          this.menu=data;
        }
      );
    }
    else if(deviceValue==4){
      this._menuser.getDataByPriceAsc().subscribe(
        (data:any)=>{
          this.menu=data;
        }
      );
    }
    else if(deviceValue==5){
      this._menuser.getDataBYPriceDesc().subscribe(
        (data:any)=>{
          this.menu=data;
        }
      );
    }
}

  OnPriceFilter(amountTo:string, amountFrom:string) {
    let x: number;
    let y:number;
    x = parseInt(amountTo);
    y=  parseInt(amountFrom);
    let z=new pricerange(x,y);
    this._menuser.getDataByRange(z).subscribe(
      (data:any)=>{
        this.menu=data;
      }
    );
  }

  cat_id:number=0;
  menu_id=0;

  searchProduct(){
    for (let i=0;i<this.category.length;i++){
      var areEqual =this.category[i].cat_name.toUpperCase() === this.searchName.toUpperCase();
      if (areEqual){
        this.cat_id=this.category[i].cat_id;
      }
    }

    if (this.cat_id>0){
      this._menuser.getDataByCategory(this.cat_id).subscribe(
        (data:any[])=>{
          this.menu=data;
        }
      );
    }
    else{
      console.log("else ma avu");
      this._menuser.getDataByMenuName(this.searchName).subscribe(
        (data:any)=>{
          console.log(data);
          this.menu=data;
        }
      );
    }
  }
}


