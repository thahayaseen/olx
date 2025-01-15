import Product from '../model/product'
import { Request,Response } from 'express'
interface produtsdat{
    productName:string
    ,description:string
    ,price:number
    ,image:string
    ,createdBy:string
}
export const add =async (req:Request,res:Response)=>{
   try{
    const datas:produtsdat=req.body
    const prodcs=new Product({
     datas
     })
     await prodcs.save()
     res.status(200).json({success:true,message:"product added succsesfully"})
   }
   catch(err){
    res.status(400).json({success:false,message:err})
   }
}