import { cartDetail } from '../cart/cartDetail';

export class addToCart{
  public constructor(
    public cart:cartDetail [],
    public special_instruction:string,
    public fk_order_id:number
  ){}
}
