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
class DecreaseCarQuantityService {
  constructor(

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
    ) {}

  public async execute({ car_id }: Request): Promise<Cars> {

    const carDecreased = await this.carsRepository.decreaseQuantity(car_id);

    await this.cacheProvider.invalidatePrefix('cars-list');

    await this.carsRepository.save(carDecreased);

    return carDecreased;
  }
}

export default DecreaseCarQuantityService;
