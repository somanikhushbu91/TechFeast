import { menuData } from '../menuitem/menuitem';

export class cartDetail{
  length: number;
  public constructor(
    public menuItem:menuData,
    public Quantity:number,
    public SubTotal?:number
  ){}
}
