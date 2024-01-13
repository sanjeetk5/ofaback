import { Router } from 'express';
import Ico from './icoController';
import 'express-async-errors';

const icoRoute = Router();

/**
 * @method GET
 * @icoRoute api/v1/ico/getBuyTokenDetails
 * @queryParms api/v1/ico/getBuyTokenDetails
 * @access PUBLIC
 * @description icoRoute to fetch Buy Token Details list
 */
icoRoute.get('/getBuyTokenDetails', Ico.getBuyTokenDetails);

export default icoRoute;