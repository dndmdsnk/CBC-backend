import express from 'express';
import { createUsers,loginUser, loginWithGoogle, resetPassword, sendOTP, getUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/', createUsers);
userRouter.get("/",getUser)
userRouter.post('/login', loginUser);
userRouter.post("/login/google", loginWithGoogle)
userRouter.post("/send-otp", sendOTP)
userRouter.post("/reset-password", resetPassword)


export default userRouter;