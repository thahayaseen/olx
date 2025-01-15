import { Request,Response} from 'express'
import bcrypt from 'bcryptjs'
const salt=10
import User from '../model/user'
interface UserRequestBody {
    name?: string;
    email: string;
    password: string;
  }
  export const signup = async (req: Request, res: Response): Promise<void> => {

   try{
    console.log(req.body);
    
    const {name,email,password}:UserRequestBody=req.body
    console.log(name);
    
    if(!name||!email||!password){
        res.status(400).json({success:false,message:"Please fill all fields"})
        return
    }
    if(name.length<=4){
        res.status(400).json({success:false,message:"atleast 4 characters required for name"})
        return
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        res.status(400).json({ success: false, message: "Invalid email" });
        return
    }
    const user=await User.findOne({email})
    if(user){
        res.status(400).json({success:false,message:'user already exist with this email'})
        return
    }
    const validUsername = /^[A-Za-z\s'-]{2,50}$/;
    if (!validUsername.test(name)) {
         res.status(400).json({ success: false, message: "Invalid name" });
         return
    }

   const passwords=await bcrypt.hash(password,salt)
   console.log(passwords);
   
   const datas= new User({
       name:name,
       email:email,
       password:passwords
    })
    await datas.save()
    console.log(datas.id);
    
    res.status(200).json({success:true,message:"autenticated",uid:datas.id})
    return
   }
   catch(err){
    console.log(err);
    
   }
}
export const login=async(req:Request,res:Response):Promise<void>=>{
   try{
    console.log('here');
    
    const {email,password}:UserRequestBody = req.body
    console.log(req.body);
    
    if(!email||!password){
      res.status(400).json({success:false,message:"Please fill the inputs"})
      return
    }
    const users =await User.findOne({email:email})
    console.log(users);
    
    if(!users||!users.password){
      res.status(400).json({success:false,message:"user not found"})
      return
    }

    const pass=await bcrypt.compare(password,users.password)
    console.log(pass);
    
    if(!pass){
        res.status(400).json({success:false,message:"incorrect password"})
        return 
    }
    console.log('loged in succsfully done');
    res.status(200).json({success:true,message:"autenticated",uid:users.id})
    return
   }
catch(err){
    console.log(err);
    
}
      

}