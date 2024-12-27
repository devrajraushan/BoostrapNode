import userModel from "../model/user.model.js"
import bcrypt from "bcrypt"
export const signup =async(req,res)=>{
    try{
        const data = req.body
        console.log(data)
        const newuser = new userModel(data)
        await newuser.save()
        res.status(200).json(data)        
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

export const login = async(req,res)=>{
    try{
        const {email,password} = req.body
        const user = await userModel.findOne({email:email})
        if(!user)
            return res.status(404).send("User not found")
       const islogin = await bcrypt.compare(password,user.password)
       if(!islogin)
       return res.status(401).send("wrong password")
       res.status(200).send("success")

    }
    catch(err){
        res.status(500).send(err)
    }

}