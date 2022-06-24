import { Component, OnInit } from '@angular/core';
import { MenuitemserService } from '../menuitem/menuitemser.service';
import { menuData } from '../menuitem/menuitem';
import { cartDetail } from '../cart/cartDetail';
import { Cart } from '../cart/cart';
import { CartDataService } from '../cart/cart-data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private _menuser:MenuitemserService,private _cartService:CartDataService) { }
  menu:menuData[]=[];
  menu1:any[]=[];
  cartProductItem:menuData=null;
  currentCartItem:cartDetail=null;

  SubTotal:number=0;
  GrandTotal:number=0;

  ngOnInit(): void {
    this._menuser.getDataForSlider1().subscribe(
      (data:any)=>{
        this._menuser.getDataForSlider2().subscribe(
          (data:any)=>{
            console.log(data);
              this.menu1=data;
              console.log(this.menu1);
          }
        );
        this.menu=data;
        console.log(this.menu);
      }
    );
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


}
