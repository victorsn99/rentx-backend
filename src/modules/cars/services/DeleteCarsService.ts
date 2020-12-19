import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Cars from '../infra/typeorm/entities/Cars';
import ICarsRepository from '../interfaces/ICarsRepository';

interface Request {
  car_id: string;
}

@injectable()
class DeleteCarsService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    ) {}

  public async execute({ car_id }: Request): Promise<void> {

      const car = await this.carsRepository.findById(car_id);

      if (!car) {
          throw new AppError('Car not found');
      }

      this.carsRepository.delete(car_id);
  }
}

export default DeleteCarsService;
