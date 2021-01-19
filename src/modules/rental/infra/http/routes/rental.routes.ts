import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import RentalsController from '../controllers/RentalController';
import CarController from '@modules/cars/infra/http/controllers/CarController';
import { celebrate, Segments, Joi } from 'celebrate';
import uploadConfig from '@config/upload';
import multer from 'multer';

const upload = multer(uploadConfig.multer);


const rentalsRouter = Router();
const rentalsController = new RentalsController();
const carController = new CarController();

rentalsRouter.use(ensureAuthenticated);

// USUÁRIO
rentalsRouter.get('/findById/:rental_id', rentalsController.findById);
rentalsRouter.get('/findAllActiveById', rentalsController.findAllActiveRentalsById);
rentalsRouter.get('/findAllInactiveById', rentalsController.findAllInactiveRentalsById);

rentalsRouter.post('/create', celebrate({
    [Segments.BODY]: {
        car_rental_id: Joi.string().required(),
        car_id: Joi.string().required(),
        insurance_id: Joi.string(),
        start_date: Joi.string().required(),
        end_date: Joi.string().required(),
    },
}), rentalsController.create);

// LOCADORA
rentalsRouter.get('/findAll', rentalsController.findAll);
rentalsRouter.put('/changeToInactive/:id', rentalsController.changeToInactive);
rentalsRouter.put('/changeToActive/:id', rentalsController.changeToActive);
rentalsRouter.get('/findByStartDate', rentalsController.findByStartDate);
rentalsRouter.get('/findByEndDate', rentalsController.findByEndDate);
rentalsRouter.get('/orderByStartDate', rentalsController.orderByStartDate);
rentalsRouter.get('/orderByEndDate', rentalsController.orderByEndDate);
 
rentalsRouter.delete('/delete/:rental_id', rentalsController.delete);

export default rentalsRouter;
