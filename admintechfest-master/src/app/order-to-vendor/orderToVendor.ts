export class orderToVendor
{
  public constructor
  (
    public ven_order_id:number,
    public order_name:string,
    public qty:number,
    public date:Date,
    public special_instruction:string,
    public fk_vendor_id:number,
    public amount:number,
    public price:number,
    public is_delivered:string,
    public vendor_id?:number,
    public vendor_name?:string,
    public vendor_email?:string
  ){}
}
