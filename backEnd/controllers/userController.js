// hiring@tjcg.in


import bcryptjs from 'bcryptjs';

import { errorHandler } from "../utils/error.js"
import User from '../models/usermodel.js'
import Listing from '../models/listingmodel.js';
import mongoose from 'mongoose';
// const { ObjectId } = mongoose.Types;

export const test=(req,res)=>{
    res.send("hello world!!")
}


export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can only update your own account'));
    }

    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        }, { new: true });

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};


export const deleteUser=async(req,res,next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401,'you can only delete your own account'))
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access-token')
     res.status(200).json("user deleted successfully");
        
    } catch (error) {
        
        next(error);
    }
}


export const getUserListings=async(req,res,next)=>{
    console.log('req.user.id:', req.user.id);
    console.log('req.params.id:', req.params.id);
    if(req.user.id === req.params.id){

        try {
        
            const listings=await Listing.find({ userRef:req.params.id});
            console.log('Listings:', listings);
            console.log('Listings length:', listings.length);

            res.status(200).json(listings)
        } catch(error) {
            console.error('Error fetching listings:', error);
             next(error);
        }
    }
      else{
        return  next(errorHandler(401,"You can only view your own listing"))
    }

       
}


export const getUser=async(req,res,next)=>{
try{
    const user=await User.findById( req.params.id);

    if(!user) return next(errorHandler(404,'User not found'))
        const {password:pass,...rest}=user._doc
       res.status(200).json(rest);
}
catch(error){
    next(error);
}

}