import CreateInsuranceService from '@modules/insurance/services/CreateInsuranceService';
import ShowInsuranceByIdService from '@modules/insurance/services/ShowInsuranceByIdService';
import ShowAllInsurancesService from '@modules/insurance/services/ShowAllInsurancesService';
import UpdateInsuranceService from '@modules/insurance/services/UpdateInsuranceService';
import DeleteInsuranceService from '@modules/insurance/services/DeleteInsuranceService';

import { classToClass } from 'class-transformer';
import { Request, Response} from 'express';
import multer from 'multer';
import { container } from 'tsyringe';

export default class InsuranceController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { name, 
            description, 
            value } =  request.body;

        const createInsurance = container.resolve(CreateInsuranceService);

        const insurance = await createInsurance.execute({ name, 
            description,
            value });

        console.log(insurance);

        return response.status(201).json(classToClass(insurance));
    }

    public async findById(request: Request, response: Response): Promise<Response>{
        const {insurance_id} = request.params;

        const findInsuranceById = container.resolve(ShowInsuranceByIdService);

        const insurance = await findInsuranceById.execute({ insurance_id });
        
        return response.json(classToClass(insurance));
    }

    public async findAll(request: Request, response: Response): Promise<Response>{
        const findAllInsurances = container.resolve(ShowAllInsurancesService);
        
        const insurances = await findAllInsurances.execute();

        return response.json(classToClass(insurances));
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const {insurance_id} = request.params;
        const { name, 
            description,
            value } =  request.body;

        const updateInsuranceService = await container.resolve(UpdateInsuranceService);

        const insurance = await updateInsuranceService.execute({
            insurance_id,
            name, 
            description,
            value
        });

        console.log(insurance);

        return response.status(200).json(classToClass(insurance));
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const {insurance_id} = request.params;

        const deleteInsuranceService = container.resolve(DeleteInsuranceService);

        const insurance = await deleteInsuranceService.execute({insurance_id});

        console.log(insurance);

        return response.status(204).json({ message: "Insurance deleted with success."});
    }
}