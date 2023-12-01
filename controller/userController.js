const userModel = require('../models/userModel')
//get all users
exports.registerController = async (req,res) => { 
    try{
        const {username,email,password} = req.body
        //validation
        if(!username || !email || !password){
            return res.status(400).send({
                success:false,
                message:"Please fill all fields"
            })
        }
        //existing user 
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(401).send({
                success:false,
                message:"User already exists",
            })
        }
        //Save new User
        const user = new userModel({username,email,password})
        await user.save()
        return res.status(201).send({
            success:true,
            message:'New User Created',
            user
        })

    }catch(error){
        console.log(error)
        return res.status(500).send({
            message:`Error In Register callback`,
            success:false,
            error
        })
    }
};

//create user register user
exports.getAllUsers = () => {};

//create user register user
exports.loginController = () => {};
