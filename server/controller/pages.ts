import product from "../model/product"
import { Request,Response } from "express"

export const home=async (req:Request,res:Response):Promise<void>=>{

    const datas=await product.find({})
    if(!datas){
        res.status(400).json({success:false,message:"cannot get datas"})
    }
    res.status(200).json({success:true,data:datas})
}