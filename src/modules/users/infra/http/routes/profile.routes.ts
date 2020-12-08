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
        old_password: Joi.string(),
        password: Joi.string(),
        password_confirmation: Joi.string().valid(Joi.ref('password')),
    }
}), profileController.update);

export default profileRouter;
