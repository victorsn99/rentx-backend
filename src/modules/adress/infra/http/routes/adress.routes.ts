import { Router } from 'express';
import { container } from 'tsyringe';

import multer from 'multer';
import uploadConfig from '../../../../../config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AdressController from '../controllers/AdressController';
import { celebrate, Joi, Segments } from 'celebrate';

const adressRouter = Router();
const adressController = new AdressController();

adressRouter.post('/create', celebrate({
    [Segments.BODY]: {
        street: Joi.string().required(),
        number: Joi.number().required(),
        zip_code: Joi.string().required(),
        neighborhood: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
    },
}), adressController.create);

adressRouter.put('/update', celebrate({
    [Segments.BODY]: {
        street: Joi.string().required(),
        number: Joi.number().required(),
        zip_code: Joi.string().required(),
        neighborhood: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
    },
}), adressController.update);

adressRouter.delete('/delete', adressController.delete);

adressRouter.get('/show', adressController.show);

export default usersRouter;
