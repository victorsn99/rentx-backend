import User from '@modules/users/infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IRentalsRepository from '../interfaces/IRentalsRepository';
import Rentals from '../infra/typeorm/entities/Rentals';
import { differenceInDays, isAfter, isBefore } from 'date-fns';
import ICarsRepository from '@modules/cars/interfaces/ICarsRepository';
import IInsuranceRepository from '@modules/insurance/interfaces/IInsuranceRepository';
import IUsersRepository from '@modules/users/interfaces/IUsersRepository';

interface Request {
    id: string;
    user_id: string;
}

@injectable()
class ChangeRentalToActive {
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
      throw new AppError('Only rentals can activate an rent');
    }

    const rental = await this.rentalRepository.findById(id);

    if (!rental){
        throw new AppError('This rental doesnt exists')
    }

    if (rental.is_active === true){
      throw new AppError('This rental is already active.')
    }

    if (isBefore(rental.start_date, new Date()) || isAfter(rental.end_date, new Date())) {
      throw new AppError('The rental only could be started when the date and hour is after start date or before end date');
    }  

    rental.is_active = true;
    
    await this.cacheProvider.invalidatePrefix('cars-list');
    
    await this.rentalRepository.save(rental);
    
    return rental;
  }
}

export default ChangeRentalToActive;