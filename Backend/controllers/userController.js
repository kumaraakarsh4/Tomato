import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import { response } from "express";

//Login User.
const loginUser = async(req,res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});

        //checking user is present or not.
        if(!user){
            return res.json({success:false,message:"User Doesn't Exist."})
        }

        //Compase current password with database password.
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Invalid Credentials."});
        }

        const token = createToken(user._id);
        res.json({success:true,token});

    } catch (error) {
        console.error(error);
        res.json({success:false,message:"Error"});
    }

}

//Create Token.
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

//Register User.
const registerUser = async(req,res) => {
    const {name,email,password} = req.body;
    try {
        //checking is user already exist or not.
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User Already Exist."})
        }

        //validation and strong password.
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email."})
        }

        //Checking length of the password.
        if(password.length < 8){
            return res.json({success:false,message:"Please enter strong password."})
        }
        
        //hashing user password.
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedpassword,
        })

        //Save the user in DB.
        const user = await newUser.save();
        const token = createToken(user._id);
        return res.json({success:true,token});

    } catch (error) {
        console.error(error);
        res.json({success:true,message:"Error"});
    }
}

export {loginUser,registerUser};