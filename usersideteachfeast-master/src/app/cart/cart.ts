import { cartDetail } from './cartDetail';


export class Cart {
  public constructor(
    public CartItems: cartDetail[],
    public GrandTotal:number
  ) {}
}
