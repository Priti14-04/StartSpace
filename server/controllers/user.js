import User from "../models/User.js";
import md5 from "md5"
import jwt from "jsonwebtoken";

const postSignup = async (req,res) => {

    const {name, email,password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({
            success:false,
            message:"name,email and password are required",
        })
    }

    const nameValidationRegex =/^[A-Za-z]+(?: [A-Za-z]+)*$/;
    const emailValidationRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
     const passwordValidationRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/

    

    if (nameValidationRegex.test(name) == false) {
        return res.status(400).json({
            success:false,
            message:"Name should be only alphabets and spaces",
        })
    }

    if(emailValidationRegex.test(email) == false){
        return res.status(400).json({
             sucess:false,
            message:"Email is not valid",
        })
    }

    if(passwordValidationRegex.test(password) == false){
        return res.status(400).json({
             success:false,
            message:"Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
        })
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            success:false,
            message:`User with email ${email} already exists`,
        })
    }

    const newUser = new User({name,email,password : md5(password)});

    const savedUser = await newUser.save();

    res.json({
        success:true,
        message:"User registered successfuly",
        user:savedUser,
    })

}

const postLogin = async(req,res)=>{
    const {email , password} = req.body;

    if(!email || !password) {
        return res.status(400).json({
            success:false,
            message:"email and password are required",
        });
    }

    const existingUser = await User.findOne({email,password :md5(password)}).
    select(
        "_id name email"
    );

    if(existingUser){

        const token = jwt.sign
        ({ id: existingUser._id, email: existingUser.email, name: existingUser.name }, 
        process.env.JWT_SECRET, { expiresIn: "1d" });


        return res.json({
            success:true,
            message:"User logged in successfully",
            user:existingUser,
            token,
        });
 
    }
    else{
        return res.status(401).json({
            success:false,
            message:"invalid email or password",
        });
    }
}

export{postSignup,postLogin}