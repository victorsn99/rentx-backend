import CreateRentalService from '@modules/rental/services/CreateRentalService';
import DeleteRentalService from '@modules/rental/services/DeleteRentalService';
import ShowAllActiveRentalsByIdService from '@modules/rental/services/ShowAllActiveRentalsByUserIdService';
import ShowAllInactiveRentalsByIdService from '@modules/rental/services/ShowAllInactiveRentalsByUserIdService';
import ShowAllRentalsService from '@modules/rental/services/ShowAllRentalsService';
import { classToClass } from 'class-transformer';
import { Request, Response} from 'express';
import multer from 'multer';
import { container } from 'tsyringe';
import ChangeToInactiveService from '@modules/rental/services/ChangeRentalToInactive';
import ChangeToActiveService from '@modules/rental/services/ChangeRentalToActive';
import ShowRentalsOrderedByEndDateService from '@modules/rental/services/ShowRentalsOrderedByEndDateService';
import ShowRentalsOrderedByStartDateService from '@modules/rental/services/ShowRentalsOrderedByStartDateService';
import ShowRentalsByEndDateService from '@modules/rental/services/ShowRentalsByEndDateService';
import ShowRentalsByStartDateService from '@modules/rental/services/ShowRentalsByStartDateService';
import ShowRentalsByIdService from '@modules/rental/services/ShowRentalsByIdService';

export default class RentalController {
    public async create(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;

        const { car_rental_id, car_id, insurance_id, start_date, end_date } =  request.body;

        const createCar = container.resolve(CreateRentalService);

        const rentals = await createCar.execute({user_id, 
            car_id,
            car_rental_id,
            insurance_id,
            is_active: false,
            start_date, 
            end_date });

        console.log(rentals);

        return response.status(201).json(classToClass(rentals));
    }

    public async findById(request: Request, response: Response): Promise<Response>{
        const {id} = request.params;

        const findRental = container.resolve(ShowRentalsByIdService);

        const rentals = await findRental.execute({ id });
        
        return response.json(classToClass(rentals));
    }

    public async findAll(request: Request, response: Response): Promise<Response>{
        const user_id = request.user.id;

        const rental = container.resolve(ShowAllRentalsService);

        const rentals = await rental.execute({ user_id });
        
        return response.json(classToClass(rentals));
    }

    public async findAllActiveRentalsById(request: Request, response: Response): Promise<Response>{
        const user_id = request.user.id;

        const findRental = container.resolve(ShowAllActiveRentalsByIdService);

        const rentals = await findRental.execute({ user_id });
        return response.json(classToClass(rentals));
    }

    public async findAllInactiveRentalsById(request: Request, response: Response): Promise<Response>{
        const user_id = request.user.id;

        const findRental = container.resolve(ShowAllInactiveRentalsByIdService);

        const rentals = await findRental.execute({ user_id });
        return response.json(classToClass(rentals));
    }

    public async findByStartDate(request: Request, response: Response): Promise<Response>{
        const user_id = request.user.id;

        const {start_date} = request.body;

        const rental = container.resolve(ShowRentalsByStartDateService);

        const rentals = await rental.execute({ user_id, start_date });
        return response.json(classToClass(rentals));
    }
      
      public async findByEndDate(request: Request, response: Response): Promise<Response>{
        const user_id = request.user.id;

        const {end_date} = request.body;

        const rental = container.resolve(ShowRentalsByEndDateService);

        const rentals = await rental.execute({ user_id, end_date });
        return response.json(classToClass(rentals));
    }
      
      public async orderByStartDate(request: Request, response: Response): Promise<Response>{
        const user_id = request.user.id;

        const rental = container.resolve(ShowRentalsOrderedByStartDateService);

        const rentals = await rental.execute({ user_id });
        return response.json(classToClass(rentals));
    }
      
      public async orderByEndDate(request: Request, response: Response): Promise<Response>{
        const user_id = request.user.id;

        const rental = container.resolve(ShowRentalsOrderedByEndDateService);

        const rentals = await rental.execute({ user_id });
        return response.json(classToClass(rentals));
    } 

    public async delete(request: Request, response: Response): Promise<Response> {
        const {rental_id} = request.params;

        const deleteRentalsService = container.resolve(DeleteRentalService);

        const rentals = await deleteRentalsService.execute({rental_id});

        console.log(rentals);

        return response.status(204).json({ message: "Rental deleted with success."});
    }

    public async changeToInactive(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;

        const {id} = request.params;

        const changeToInactive = await container.resolve(ChangeToInactiveService);

        const rental = await changeToInactive.execute({ user_id, id });

        console.log(rental);

        return response.status(200).json(classToClass(rental));
    }

    public async changeToActive(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;

        const {id} = request.params;

        const changeToActive = await container.resolve(ChangeToActiveService);

        const rental = await changeToActive.execute({ user_id, id });

        console.log(rental);

        return response.status(200).json(classToClass(rental));
    }
}