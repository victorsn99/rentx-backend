import CreateUserService from '@modules/users/services/CreateUserService';
import { classToClass } from 'class-transformer';
import { Request, Response} from 'express';
import { container } from 'tsyringe';

export default class UsersController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password, cpf_cnpj, is_rental } =  request.body;

        const createUser = await container.resolve(CreateUserService);

        const user = await createUser.execute({
            name, email, password, cpf_cnpj, is_rental
        });

        console.log(user);

        return response.status(201).json(classToClass(user));
    }
}