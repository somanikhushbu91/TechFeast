export class order_detail{
  public constructor(
    public order_details_id:number,
    public fk_menu_id:number,
    public qty:number,
    public special_instruction:string,
    public fk_order_id:number,
    public table_no?:number,
    public name?:string,
    public price?:number
  ){

  }
}
