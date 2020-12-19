import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Cars from "../infra/typeorm/entities/Cars";
import ICarsRepository from "../interfaces/ICarsRepository";

interface Request {
    car_id: string;
}

@injectable()
class ShowCarsByIdService {
  constructor(

    @inject('CarsRepository')
    private carsRepository: ICarsRepository

  ){}

  public async execute({ car_id }: Request): Promise<Cars> {
    const cars = await this.carsRepository.findById(car_id);

    if (!cars) {
        throw new AppError('Car not found');
    }

    return cars;
  }
}

export default ShowCarsByIdService;
