import product from "../model/product";

import { Request,Response } from "express"

export default async (req:Request,res:Response)=>{
  try {
    console.log(req.params.id);
    if(!req.params.id){
        return
    }
    const data=  await product.findById(req.params.id).populate('seller')
    console.log(data);
    
    if(!data){
      res.status(200).json({success:false,message:"product not found"})
      return
    }
    res.status(200).json({success:true,message:"got it",pdata:data})
  } catch (error) {
    console.log(error);
    
  }
 
}