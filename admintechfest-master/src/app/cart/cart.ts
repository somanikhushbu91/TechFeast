export class cartData
{
  public constructor(
    public cart_id:number,
    public fk_menu_id:number,
    public qty:number,
    public date:Date,
    public table_no:number,
    public special_instruction:string,
    public status:string,
    public name?:string,
    public price?:number
  ) {}
}
