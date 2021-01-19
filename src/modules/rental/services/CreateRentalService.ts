import User from '@modules/users/infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IRentalsRepository from '../interfaces/IRentalsRepository';
import Rentals from '../infra/typeorm/entities/Rentals';
import { differenceInDays, isAfter, isBefore, isEqual, parse, parseISO } from 'date-fns';
import ICarsRepository from '@modules/cars/interfaces/ICarsRepository';
import IInsuranceRepository from '@modules/insurance/interfaces/IInsuranceRepository';

interface Request {
    user_id: string;
    car_rental_id: string;
    car_id: string;
    insurance_id: string;
    is_active: boolean;
    start_date: Date;
    end_date: Date;
}

@injectable()
class CreateRentalService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RentalsRepository')
    private rentalRepository: IRentalsRepository,

    @inject('CarsRepository')
    private carRepository: ICarsRepository,

    @inject('InsuranceRepository')
    private insuranceRepository: IInsuranceRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
    ) {}

  public async execute({ car_rental_id, user_id, car_id, insurance_id, start_date, end_date, is_active
  }: Request): Promise<Rentals> {

    let rentalIsActive;

    if (user_id === car_rental_id) {
      throw new AppError('You shoudnt be an rental and client at the same time.', 401);
    }

    const car = await this.carRepository.findById(car_id);

    console.log(car);

    if (!car) {
      throw new AppError('This car doesnt exists.', 401);
    }

    const carQuantity = await this.carRepository.returnQuantity(car_id);

    if (carQuantity <= 0) {
      throw new AppError('Insufficient car quantity.', 401);
    }

    const insurance = await this.insuranceRepository.findById(insurance_id);

    if (!insurance) {
      throw new AppError('This insurance doesnt exists.', 401);
    }

    const userIsRental = await this.usersRepository.isRental(user_id);
    const carRentalIsRental = await this.usersRepository.isRental(car_rental_id);

    console.log(userIsRental);
    console.log(carRentalIsRental);
    

    if (!userIsRental && carRentalIsRental){
      const startDateFormatted = parseISO(String(start_date));
      const endDateFormatted = parseISO(String(end_date));

      console.log(startDateFormatted);
      console.log(endDateFormatted);

      if (isBefore(startDateFormatted, Date.now())) {
        throw new AppError("you can't make a rent before now");
      }

      if (isEqual(startDateFormatted, endDateFormatted)) {
        throw new AppError("the end date and start date shouldnt be the same");
      }

      const daysBehindStartAndEnd = differenceInDays(endDateFormatted, startDateFormatted);

      console.log(daysBehindStartAndEnd);
      

      const total_value = (car.daily_value * daysBehindStartAndEnd) + insurance.value;

      console.log('total value: ' + total_value);
      

      const createRental = await this.rentalRepository.create({
        user_id, 
        car_rental_id,
        car_id, 
        insurance_id,
        total_value,
        is_active,
        start_date,
        end_date
      });

      this.carRepository.decreaseQuantity(car_id);
    
      await this.cacheProvider.invalidatePrefix('cars-list');
    
      await this.rentalRepository.save(createRental);
    
      return createRental;
    } else {
      throw new AppError('Only rent a car could rent a car / Only users can make rentals', 401);
    }

    
  }
}

export default CreateRentalService;
