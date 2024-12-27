
import { Schema,model } from "mongoose";
import bcrypt from "bcrypt"

const newSchema = new Schema({
    fullname:{
        type:String,
        trim:true,
        lowercase:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        required:true
    },
    phone:{
        type:Number,
        trim:true,
        required:true        
    },
    password:{
        type:String,
        trim:true,
        required:true        
    }
})
newSchema.pre("save",async function(next){
   const count = await model("User").countDocuments({email:this.email})
   if(count)
     throw next(new Error("User is exits"))
    next()   
})
newSchema.pre("save",async function(next){
    const encrypt = await bcrypt.hash(this.password.toString(),12)
    this.password = encrypt
    next()
})
const userModel = model("User",newSchema)
export default userModel
