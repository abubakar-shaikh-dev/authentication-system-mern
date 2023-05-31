//Packages
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Models
import User from "../models/User.model.js";

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    //Email Validation
    const email_exist = await User.findOne({ email: email });
    if (email_exist)
      return res
        .status(400)
        .json({ status: 0, msg: `Email is Already in Use.` });

    //Hashing Password
    bcrypt
      .hash(password, 10)
      .then((HashedPassword) => {
        const newUser = new User({
            name,
            email,
            password:HashedPassword
        })
        newUser.save()
            .then(()=>{
                return res.status(201).json({status:1,msg:"Registerd Successfully."})
            })
            .catch((err)=>res.status(500).json({status:0,msg:"Failed while registering User"}))
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ status: 0, msg: "Unable to Hash Password." });
      });
  } catch (error) {
    return res
      .status(500)
      .json({status:0,msg:"Failed while registering User"});
  }
}

export async function login(req,res) {
  try {
    const { email , password } = req.body;

    const user = await User.findOne({email})
    if(!user) return res.status(404).json({status:0,msg:"User Not Found"})

    const passwordMatched = await bcrypt.compare(password,user.password)
    if(!passwordMatched) return res.status(401).json({status:0,msg:"Invalid Password"})

    const token = jwt.sign({user_id:user._id},process.env.SECRET_KEY,{expiresIn:"24h"})

    return res.status(200).json({status:1,msg:"Login Successfull.",token})

  } catch (error) {
    return res.status(500).json({status:0,msg:error.message})
  }
}

export async function user(req,res){
  try {
    User.findOne({_id:req.user_id},(err,data)=>{
      if(err) throw err;
      if(!data) return res.status(404).json({status:0,msg:"User Not Found."})
      const {password, ...user} = Object.assign({},data.toJSON());
      return res.status(200).json({status:1,msg:"User Found.",user:user})
    })

  } catch (error) {
    return res.status(500).json({status:0,msg:`Server Error : ${error.message}`})
  }
}

export async function update(req,res){
  try {
    const { _id, name, email } = req.body;

    if(req.user_id != _id) return res.status(403).json({status:0,msg:"You Are Not Allowed NOOB!.."})

    User.updateOne({_id:_id},{name:name,email:email},(err,data)=>{
      if(err) return res.status(404).json({status:0,msg:"User Not Found"})
      if(!data) return res.status(404).json({status:0,msg:"User Not Found"})

      return res.status(200).json({status:1,msg:"Data updated Successfully."})
    })
  } catch (error) {
    return res.status(500).json({status:0,msg:`Internal Server Error : ${error.message}`})
  }
}

export async function logout(req,res){
  try {
    return res.status(200).json({status:1,msg:"Logout Successfull."})
  } catch (error) {
    return res.status(500).json({status:0,msg:`Internal Server Error : ${error.message}`})
  }
}

