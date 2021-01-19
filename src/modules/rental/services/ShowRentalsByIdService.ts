import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Rentals from "../infra/typeorm/entities/Rentals";
import IRentalsRepository from '../interfaces/IRentalsRepository';
import IRentalsRentalRepository from '../interfaces/rental/IRentalsCarRentalRepository';
import IRentalsUsersRepository from '../interfaces/users/IRentalsUsersRepository';

interface Request {
    id: string;
}

@injectable()
class ShowRentalsByIdService {
  constructor(

    @inject('RentalsRentalRepository')
    private rentalsRentalRepository: IRentalsRepository

  ){}

  public async execute({ id }: Request): Promise<Rentals> {

    const rentals = await this.rentalsRentalRepository.findById(id);

    if (!rentals) {
        throw new AppError('Rentals not found');
    }

    return rentals;
  }
}

export default ShowRentalsByIdService;
