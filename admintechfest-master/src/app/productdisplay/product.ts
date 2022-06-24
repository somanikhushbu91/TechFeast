export class pro{
  constructor(
    public pro_id:number,
    public pro_name:string,
    public pro_price:number,
    public pro_color:string,
    public pro_mfg:string,
    public pro_soh:number,
    public img:string,
    public fk_cat_id:number,
    public cat_id?:number,
    public cat_name?:string
  ){}
}
