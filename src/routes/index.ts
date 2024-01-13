import { Router } from 'express';
import UserRoute from '../components/user/userRoute';
import icoRoute from '../components/ico/icoRoute';

const route = Router();

route.use('/user', UserRoute);
route.use('/ico', icoRoute);

export default route;
