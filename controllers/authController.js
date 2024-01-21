import userModel from "../models/userModel.js";
import {} from "./../helpers/authHelper.js";

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
