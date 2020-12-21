import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CarController from '../controllers/CarController';
import { celebrate, Segments, Joi } from 'celebrate';
import uploadConfig from '@config/upload';
import multer from 'multer';

const upload = multer(uploadConfig.multer);


const carsRouter = Router();
const carsController = new CarController();

carsRouter.use(ensureAuthenticated);

carsRouter.get('/findById/:car_id', carsController.findById);
carsRouter.get('/findByName/:name', carsController.findByName);
carsRouter.get('/findByFuel/:fuel', carsController.findByFuel);
carsRouter.get('/findByTransmission/:transmission', carsController.findByTransmission);
carsRouter.get('/findByType/:type', carsController.findByType);

carsRouter.put('/increaseCarQuantity/:car_id', carsController.increaseCarQuantity);
carsRouter.put('/decreaseCarQuantity/:car_id', carsController.decreaseCarQuantity);
 
carsRouter.delete('/delete/:car_id', carsController.delete);

carsRouter.put('/update/:car_id', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        brand: Joi.string().required(),
        daily_value: Joi.number().required(),
        category: Joi.string().required(),
        fuel: Joi.string().required(),
        horsepower: Joi.number().required(),
        engine: Joi.string().required(),
        transmission: Joi.string().required(),
        type: Joi.string().required(),
        quantity: Joi.number().required(),
        color: Joi.string().required(),
    }
}), carsController.update);

carsRouter.post('/create', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        rental_id: Joi.string().required(),
        brand: Joi.string().required(),
        daily_value: Joi.number().required(),
        category: Joi.string().required(),
        fuel: Joi.string().required(),
        horsepower: Joi.number().required(),
        engine: Joi.string().required(),
        transmission: Joi.string().required(),
        type: Joi.string().required(),
        quantity: Joi.number().required(),
        color: Joi.string().required(),
    },
}), carsController.create);

carsRouter.patch('/image/:car_id', ensureAuthenticated, upload.single('image'), carsController.updateImage);


export default carsRouter;
