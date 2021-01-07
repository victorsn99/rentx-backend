import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import InsuranceController from '../controllers/InsuranceController';
import { celebrate, Segments, Joi } from 'celebrate';
import uploadConfig from '@config/upload';
import multer from 'multer';

const upload = multer(uploadConfig.multer);


const insuranceRouter = Router();
const insuranceController = new InsuranceController();

insuranceRouter.use(ensureAuthenticated);

insuranceRouter.get('/findAll', insuranceController.findAll);

insuranceRouter.get('/findById/:insurance_id', insuranceController.findById);
 
insuranceRouter.delete('/delete/:insurance_id', insuranceController.delete);

insuranceRouter.put('/update/:insurance_id', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    }
}), insuranceController.update);

insuranceRouter.post('/create', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    },
}), insuranceController.create);

export default insuranceRouter;
