import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = "`rR,%lBXa1NxvIbYVAjB])*d+zWr2?t$>prXh0#(%3,DR@[]b@?GBm4s]f$B$cQ";

// handles the sign in functionality for a regular
//username + password sign in
export const signin = async(req, res) => {
    const {username, password} = req.body;
    try {
        const user = await UserModal.findOne({username});
        // check if the user exists
        if(!user) 
            return res.status(404).json({message: "Invalid credentials"});
        // if the user does exist then check if the entered password is the same as the
        // password associated with this user
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect)
            return res.status(400).json({message: "Invalid credentials"});
        const token = jwt.sign({username: user.username, id: user._id}, secret, {expiresIn: "1h"});
        res.status(200).json({result: user, token});
    } catch(err) {
        res.status(500).json({message: "Please try again"});
    }
};

// handles the register functionality a regular username + password method. 
export const signup = async(req, res) => {
    const {email, username, password} = req.body;
    try {
        const user = await UserModal.findOne({username});
        if(user)
            return res.status(400).json({message: "Please enter new credentials!"});
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await UserModal.create({email, password: hashedPassword, username: username});
        const token = jwt.sign({email: result.email, id: result._id}, secret, {expiresIn: "1h"});
        res.status(201).json({result, token});    
    } catch(error) {
        res.status(500).json({message: "Something went wrong"});
        console.log(error);
    }
}