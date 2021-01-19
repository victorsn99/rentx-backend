import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Rentals from '../infra/typeorm/entities/Rentals';
import IRentalsRentalRepository from '../interfaces/rental/IRentalsCarRentalRepository';
import IRentalsUsersRepository from '../interfaces/users/IRentalsUsersRepository';

interface Request {
    user_id: string;
}

@injectable()
class ShowRentalsOrderedByEndDateService {
  constructor(

    @inject('RentalsRentalRepository')
    private rentalsRentalRepository: IRentalsRentalRepository,

    @inject('RentalsUsersRepository')
    private rentalsUsersRepository: IRentalsUsersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository

  ){}

  public async execute({ user_id }: Request): Promise<Rentals[]> {

    let rentals;

    const is_rental = await this.usersRepository.isRental(user_id);

    if (is_rental){
      rentals = await this.rentalsRentalRepository.orderByEndDate(user_id);
    } else {
      rentals = await this.rentalsUsersRepository.orderByEndDate(user_id);
    }

    if (!rentals) {
        throw new AppError('Rentals not found');
    }

    return rentals;
  }
}

export default ShowRentalsOrderedByEndDateService;
