import { container } from 'tsyringe';
import '@modules/users/providers';
import IAdressRepository from '@modules/adress/interfaces/IAdressRepository';
import AdressRepository from '@modules/adress/infra/typeorm/repositories/AdressRepository';
import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUserTokensRepository from '@modules/users/interfaces/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import INotificationsRepository from '@modules/notifications/interfaces/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';
import ICarsRepository from '@modules/cars/interfaces/ICarsRepository';
import CarsRepository from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import './providers';

container.registerSingleton<INotificationsRepository>('NotificationsRepository', NotificationsRepository);
container.registerSingleton<IAdressRepository>('AdressRepository', AdressRepository);
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokensRepository);
container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);
