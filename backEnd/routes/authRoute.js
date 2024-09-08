import express from 'express';

import {google, signup,signin, signOut} from '../controllers/authController.js';


const router=express();

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/google',google);
router.get('/signout',signOut);


export default router;