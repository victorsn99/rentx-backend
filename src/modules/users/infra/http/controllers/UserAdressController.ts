import AddAdressToUserService from '@modules/users/services/AddAdressToUserService';
import { Request, Response} from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class ProfileController {

    public async update(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;
        const { adress_id } =  request.body;

        const addAdressToUserService = await container.resolve(AddAdressToUserService);

        const user = await addAdressToUserService.execute({
            user_id,
            adress_id
        });

        console.log(user);

        return response.status(201).json(classToClass(user));
    }
}