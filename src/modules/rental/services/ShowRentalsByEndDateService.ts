import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { parseISO } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import Rentals from "../infra/typeorm/entities/Rentals";
import IRentalsRepository from '../interfaces/IRentalsRepository';
import IRentalsRentalRepository from '../interfaces/rental/IRentalsCarRentalRepository';
import IRentalsUsersRepository from '../interfaces/users/IRentalsUsersRepository';

interface Request {
    user_id: string;
    end_date: string;
}

@injectable()
class ShowRentalsByEndDateService {
  constructor(

    @inject('RentalsRentalRepository')
    private rentalsRentalRepository: IRentalsRentalRepository,

    @inject('RentalsUsersRepository')
    private rentalsUsersRepository: IRentalsUsersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository

  ){}

  public async execute({ user_id, end_date }: Request): Promise<Rentals[]> {

    let rentals;

    const is_rental = await this.usersRepository.isRental(user_id);

    const formattedDate = parseISO(end_date);

    if (is_rental){
      rentals = await this.rentalsRentalRepository.findByEndDate(user_id, formattedDate);
    } else {
      rentals = await this.rentalsUsersRepository.findByEndDate(user_id, formattedDate);
    }

    if (!rentals) {
        throw new AppError('Rentals not found');
    }

    return rentals;
  }
}

export default ShowRentalsByEndDateService;
