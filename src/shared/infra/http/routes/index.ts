import { Router } from 'express';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import adressRouter from '@modules/adress/infra/http/routes/adress.routes';
import carsRouter from '@modules/cars/infra/http/routes/cars.routes';
import insuranceRouter from '@modules/insurance/infra/http/routes/insurance.routes';
import rentalsRouter from '@modules/rental/infra/http/routes/rental.routes';

const routes = Router();

routes.use('/profile', profileRouter);
routes.use('/users', usersRouter);
routes.use('/session', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/adress', adressRouter);
routes.use('/cars', carsRouter);
routes.use('/insurance', insuranceRouter);
routes.use('/rentals', rentalsRouter);

export default routes;
