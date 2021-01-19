import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Cars from '../infra/typeorm/entities/Rentals';
import IRentalsRepository from '../interfaces/IRentalsRepository';

interface Request {
  rental_id: string;
}

@injectable()
class DeleteRentalService {
  constructor(
    @inject('RentalsRepository')
    private rentalRepository: IRentalsRepository,
    ) {}

  public async execute({ rental_id }: Request): Promise<void> {

      const rental = await this.rentalRepository.findById(rental_id);

      if (!rental) {
          throw new AppError('Rental not found');
      }

      this.rentalRepository.delete(rental_id);
  }
}

export default DeleteRentalService;
