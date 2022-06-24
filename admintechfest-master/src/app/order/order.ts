export class orderdata {
  public constructor(
   public order_id:number,
   public order_amt:number,
   public payment_type:string,
   public is_paid:string,
   public discount:number,
   public table_no:number,
   public status:string,
   public date:Date,
   public fk_email_id:number,
   public qty?:number,
   public special_instruction?:string,
   public name?:string,
   public price?:number,
   public is_jain?: string,
   public ingredients?: string,
   public pic?: string,

   )
  {

  }
}
