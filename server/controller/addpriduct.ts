import Product from '../model/product'
// import path from 'path'
// import multer from 'multer'
import { Request,Response } from 'express'

export const addproduct=async(req:Request,res:Response)=>{

try{
    if(!req.file){
        res.status(200).json({success:false,message:"please add image before Submit"})
        return 
    }
    const datas=JSON.parse(req.body.product)
    
    datas.image=req.file.path

    console.log(datas);
    const product=new Product(datas)

    
    await product.save()
    res.status(200).json({success:true,message:"uploaded succesfull"})
    
}
catch(err){
    console.log(err);
    
}
 
    
}