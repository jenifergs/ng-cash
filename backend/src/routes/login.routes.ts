import { Router } from 'express';
import UserController from '../controller/UserController';
import validatedUsername from '../middlewares/validatedUsername';
import validatedPassword from '../middlewares/validatedPassword';

const loginRouter = Router();
const loginUser = new UserController();

loginRouter.post('/login', validatedUsername, validatedPassword, loginUser.loginUser);

export default loginRouter;
