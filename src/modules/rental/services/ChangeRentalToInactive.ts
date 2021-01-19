import User from '@modules/users/infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IRentalsRepository from '../interfaces/IRentalsRepository';
import Rentals from '../infra/typeorm/entities/Rentals';
import { differenceInDays, isAfter } from 'date-fns';
import ICarsRepository from '@modules/cars/interfaces/ICarsRepository';
import IInsuranceRepository from '@modules/insurance/interfaces/IInsuranceRepository';
import IUsersRepository from '@modules/users/interfaces/IUsersRepository';

interface Request {
    id: string;
    user_id: string;
}

@injectable()
class ChangeRentalToInactive {
  constructor(
    @inject('RentalsRepository')
    private rentalRepository: IRentalsRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('InsuranceRepository')
    private insuranceRepository: IInsuranceRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
    ) {}

  public async execute({ user_id, id }: Request): Promise<Rentals> {

    const userIsRental = await this.userRepository.isRental(user_id);

    if (!userIsRental) {
      throw new AppError('Only rentals can inactivate an rent');
    }

    let penalty = 0;

    const rental = await this.rentalRepository.findById(id);

    if (!rental){
        throw new AppError('This rental doesnt exists')
    }

    if (rental.is_active === false) {
      throw new AppError('This rental is already inactive.')
    }

    if (isAfter(rental.end_date, new Date())) {
      const car = await this.carsRepository.findById(rental.car_id);

      if (!car) {
          throw new AppError('Car doesnt exists');
      }

      const insurance = await this.insuranceRepository.findById(rental.insurance_id);

      if (!insurance) {
          throw new AppError('Insurance doesnt exists');
      }

      const daysBehindEndDateAndNow = differenceInDays(rental.end_date, new Date());
      if (daysBehindEndDateAndNow > 0) {
          penalty = (rental.total_value - insurance.value) + ((car.daily_value * daysBehindEndDateAndNow) * 1.08);
      }
    }  

    rental.is_active = false;
    rental.total_value = rental.total_value + penalty;
    
    await this.cacheProvider.invalidatePrefix('cars-list');
    
    await this.rentalRepository.save(rental);
    
    return rental;
  }
}

export default ChangeRentalToInactive;