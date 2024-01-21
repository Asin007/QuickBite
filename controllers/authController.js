import userModel from "../models/userModel.js";
import { comparepassword } from "./../helpers/authHelper.js";
import  Jwt  from "jsonwebtoken";

export const registerController = async (req,res) => {
    try{
        const {name,email,password,phone,address} = req.body;
        if(!name){
            return res.send({error:'Name is required'});
        }
        if(!email){
            return res.send({error:'Email is required'});
        }
        if(!password){
            return res.send({error:'Password is required'});
        }
        if(!phone){
            return res.send({error:'Phone is required'});
        }
        if(!address){
            return res.send({error:'Address is required'});
        }

        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.send(200).send({
                sucess:true,
                message:'Alredy existing user please login',
            });
        }

        const hashedpassword = await hashedpassword(password)

        const user = await new userModel({name,email,phone,address,password:hashedpassword}).save();

        res.status(201).send({
            sucess:true,
            message:'Usser Registerd Succesfully',
            user,
        });

    }catch(error){
        console.group(error)
        res.status(500).send({
            sucess:false,
            message:'error in register',
            error
        });
    }
};

export const loginController = async(req, res) => {
    try{
        const {email, password} = req.body
        if(!email || !password){
            return res.status(404).send({
                sucess:false,
                message:'Invalid Mail or Password',
            })
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email is not registered',
            })
        }
        const match = await comparepassword(password, user.password);
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid Password',
            });
        }   
        const token = await Jwt.sign({_id:user._id}, process.env.JWT_SECRET,{expiresIn:"7d"});
        res.status(200).send({
            sucess:true,
            message:"login succesful",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
            },
            token,
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            sucess:false,
            message:'Error in Login',
            error
        })
    }
};

//test controller for testing
export const testController = (req, res) => {
   res.send('protected Route');
}