import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { classToClass } from 'class-transformer';
import { parseISO } from 'date-fns';
import { Request, Response} from 'express';
import { container } from 'tsyringe';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

export default class UsersController {
    public async create(request: Request, response: Response): Promise<Response> {

            const { email, password } = request.body;
        
            const usersRepository = new UsersRepository();
        
            const authenticateUser = container.resolve(AuthenticateUserService);
        
            const { user, token } = await authenticateUser.execute({
              email, password
            });

            console.log(user, ' --- ', token);
              
            return response.json({ user: classToClass(user), token });
    }
}