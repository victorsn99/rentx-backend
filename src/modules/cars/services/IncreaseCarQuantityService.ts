import User from '@modules/users/infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICarsRepository from '../interfaces/ICarsRepository';
import Cars from '../infra/typeorm/entities/Cars';

interface Request {
    car_id: string;
    quantity: number;
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

  public async execute({ 
    car_id,
    quantity, 
  }: Request): Promise<Cars> {

    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError('Car not found', 401);
    }

    car.quantity = quantity + 1;

    await this.cacheProvider.invalidatePrefix('cars-list');

    await this.carsRepository.save(car);

    return car;
  }
}

export default CreateUserService;
