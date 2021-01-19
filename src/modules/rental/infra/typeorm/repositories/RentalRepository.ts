import { getRepository, Repository, Not, Like, QueryBuilder } from 'typeorm';
import IRentalRepository from '@modules/rental/interfaces/IRentalsRepository';
import ICreateRentalDTO from '@modules/rental/dtos/ICreateRentalDTO';
import Rentals from '../entities/Rentals';
import { parseISO } from 'date-fns';
import AppError from '@shared/errors/AppError';

class CarsRepository implements IRentalRepository {
  private ormRepository: Repository<Rentals>;
  constructor() {
    this.ormRepository = getRepository(Rentals);
  }

  public async isActive(id: string): Promise<boolean> {
    const findRent = await this.ormRepository.findOne({
      where: { id },
    });

    if (findRent) {
      return findRent.is_active;
    } else {
      throw new AppError('This rental doesnt exists.')
    }
  }

  public async findById(id: string): Promise<Rentals | undefined> {

    const findRent = await this.ormRepository.findOne({
      where: { id },
    });

    return findRent;
  }

  public async delete(id: string): Promise<void> {

    await this.ormRepository.delete(id);

  }

  public async create({
    car_rental_id, 
    car_id,
    user_id,
    insurance_id, 
    total_value,
    start_date,
    end_date,
    is_active }: ICreateRentalDTO): Promise<Rentals> {

    const rental = this.ormRepository.create({ car_rental_id, car_id, insurance_id, user_id, total_value, start_date, end_date, is_active})

    console.log('TYPEORM: ', rental);

    return rental;
  }

  public async save(rental: Rentals): Promise<Rentals> {

    const rentalSaved = await this.ormRepository.save(rental);

    return rentalSaved;

  }

}

export default CarsRepository;
