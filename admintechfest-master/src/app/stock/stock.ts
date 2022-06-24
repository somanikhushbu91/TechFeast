export class stockData
{
  public constructor
  (
      public stock_id:number,
      public title:string,
      public stockQty:number,
      public price:number,
      public date:Date,
      public fk_vendor_id:number,
      public vendor_id?:number,
      public vendor_name?:string
  ){}
}
