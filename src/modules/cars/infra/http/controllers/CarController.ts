import CreateCarService from '@modules/cars/services/CreateCarService';
import ShowCarsByIdService from '@modules/cars/services/ShowCarsByIdService';
import ShowCarsByFuelService from '@modules/cars/services/ShowCarsByFuelService';
import ShowCarsByNameService from '@modules/cars/services/ShowCarsByNameService';
import ShowCarsByTypeService from '@modules/cars/services/ShowCarsByTypeService';
import ShowCarsByTransmissionService from '@modules/cars/services/ShowCarsByTransmissionService';
import UpdateCarsService from '@modules/cars/services/UpdateCarsService';
import DeleteCarsService from '@modules/cars/services/DeleteCarsService';
import UpdateCarImageService from '@modules/cars/services/UpdateCarImageService';
import { classToClass } from 'class-transformer';
import { Request, Response} from 'express';
import multer from 'multer';
import { container } from 'tsyringe';

export default class CarController {
    public async create(request: Request, response: Response): Promise<Response> {
        const {  name, 
            brand,
            rental_id,
            daily_value,
            category, 
            fuel,
            horsepower,
            engine,
            transmission,
            type,
            quantity, 
            color } =  request.body;

        const createCar = container.resolve(CreateCarService);

        const car = await createCar.execute({name, 
            brand,
            rental_id,
            daily_value,
            category, 
            fuel,
            horsepower,
            engine,
            transmission,
            type,
            quantity, 
            color });

        console.log(car);

        return response.status(201).json(classToClass(car));
    }

    public async findById(request: Request, response: Response): Promise<Response>{
        const {car_id} = request.params;

        const findCarById = container.resolve(ShowCarsByIdService);

        const car = await findCarById.execute({ car_id });
        return response.json(classToClass(car));
    }

    public async findByName(request: Request, response: Response): Promise<Response>{
        const {name} = request.params;

        const findCarByName = container.resolve(ShowCarsByNameService);

        const car = await findCarByName.execute({ name });
        return response.json(classToClass(car));
    }
      
      public async findByFuel(request: Request, response: Response): Promise<Response>{
        const {fuel} = request.params;

        const findCarByFuel = container.resolve(ShowCarsByFuelService);

        const car = await findCarByFuel.execute({ fuel });
        return response.json(classToClass(car));
    }
      
      public async findByTransmission(request: Request, response: Response): Promise<Response>{
        const {transmission} = request.params;

        const findCarByTransmission = container.resolve(ShowCarsByTransmissionService);

        const car = await findCarByTransmission.execute({ transmission });
        return response.json(classToClass(car));
    }
      
      public async findByType(request: Request, response: Response): Promise<Response>{
        const {type} = request.params;

        const findCarByType = container.resolve(ShowCarsByTypeService);

        const car = await findCarByType.execute({ type });
        return response.json(classToClass(car));
    } 

    public async update(request: Request, response: Response): Promise<Response> {
        const {car_id} = request.params;
        const {  name, 
            brand,
            daily_value,
            category, 
            fuel,
            horsepower,
            engine,
            transmission,
            type,
            quantity, 
            color } =  request.body;

        const updateCarService = await container.resolve(UpdateCarsService);

        const car = await updateCarService.execute({
            car_id,
            name, 
            brand,
            daily_value,
            category, 
            fuel,
            horsepower,
            engine,
            transmission,
            type,
            quantity, 
            color
        });

        console.log(car);

        return response.status(200).json(classToClass(car));
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const {car_id} = request.params;

        const deleteCarsService = container.resolve(DeleteCarsService);

        const car = await deleteCarsService.execute({car_id});

        console.log(car);

        return response.status(204).json({ message: "Car deleted with success."});
    }

    public async updateImage(request: Request, response: Response): Promise<Response> {
        const {car_id} = request.params;
        const updateUserAvatar = container.resolve(UpdateCarImageService);

        const car = await updateUserAvatar.execute({
            car_id,
            imageFilename: request.file.filename,
        });

        return response.json(classToClass(car));
    }
}