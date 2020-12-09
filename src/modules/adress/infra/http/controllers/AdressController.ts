import CreateAdressService from '@modules/adress/services/CreateAdressService';
import UpdateAdressService from '@modules/adress/services/UpdateProfileService';
import ShowAdressService from '@modules/adress/services/ShowAdressService';
import DeleteAdressService from '@modules/adress/services/DeleteAdressService';
import { classToClass } from 'class-transformer';
import { Request, Response} from 'express';
import { container } from 'tsyringe';

export default class UsersController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { street, number, neighborhood, zip_code, city, state, country } =  request.body;

        const createAdress = container.resolve(CreateAdressService);

        const adress = await createAdress.execute({
            street, number, neighborhood, zip_code, city, state, country
        });

        console.log(adress);

        return response.status(201).json(classToClass(adress));
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { adress_id, street, number, neighborhood, zip_code, city, state, country } =  request.body;

        const updateAdress = container.resolve(UpdateAdressService);

        const adress = await updateAdress.execute({
            adress_id, street, number, neighborhood, zip_code, city, state, country
        });

        console.log(adress);

        return response.status(201).json(classToClass(adress));
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { adress_id } =  request.body;

        const deleteAdress = container.resolve(DeleteAdressService);

        await deleteAdress.execute(adress_id);

        return response.status(204);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { adress_id } =  request.body;

        const showAdress = container.resolve(ShowAdressService);

        const adress = await showAdress.execute({
            adress_id
        });

        return response.status(200).json(classToClass(adress));
    }
}