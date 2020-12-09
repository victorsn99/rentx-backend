import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';
import { celebrate, Segments, Joi } from 'celebrate';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/show', profileController.show);
profileRouter.put('/update', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        cpf_cnpj: Joi.string().required().min(14).max(18),
        old_password: Joi.string(),
        password: Joi.string(),
        password_confirmation: Joi.string().valid(Joi.ref('password')),
    }
}), profileController.update);

profileRouter.put('/addAdress', celebrate({
    [Segments.BODY]: {
        adress_id: Joi.string().uuid(),
    }
}), profileController.update);

export default profileRouter;
