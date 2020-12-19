import User from '@modules/users/infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICarsRepository from '../interfaces/ICarsRepository';
import Cars from '../infra/typeorm/entities/Cars';

interface Request {
    name: string;
    rental_id: string;
    brand: string;
    daily_value: number;
    category: string;
    fuel: string;
    horsepower: number;
    engine: string;
    transmission: string;
    type: string;
    quantity: number;
    color: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
    ) {}

  public async execute({ name, 
    rental_id,
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
  }: Request): Promise<Cars> {
    
    const userIsRental = await this.usersRepository.isRental(rental_id);

    if (!userIsRental) {
      throw new AppError('You should be an rental to register a car.', 401);
    }

    const car = await this.carsRepository.create({
      name, 
      rental_id,
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

    await this.cacheProvider.invalidatePrefix('cars-list');

    await this.carsRepository.save(car);

    return car;
  }
}

export default CreateUserService;
