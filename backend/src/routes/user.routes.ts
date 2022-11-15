import { Router } from 'express';
import UserController from '../controller/UserController';
import validatedUsername from '../middlewares/validatedUsername';
// import validatedPassword from '../middlewares/validatedPassword';

const userRouter = Router();
const loginUser = new UserController();

userRouter.post('/user', validatedUsername, loginUser.createUser);

export default userRouter;