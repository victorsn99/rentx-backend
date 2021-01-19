import User from '@modules/users/infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICarsRepository from '../interfaces/ICarsRepository';
import Cars from '../infra/typeorm/entities/Cars';

interface Request {
    car_id: string;
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
    car_id
  }: Request): Promise<Cars> {

    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError('Car not found', 401);
    }

    const carIncreased = await this.carsRepository.increaseQuantity(car_id);

    await this.cacheProvider.invalidatePrefix('cars-list');

    await this.carsRepository.save(carIncreased);

    return car;
  }
}

export default CreateUserService;
