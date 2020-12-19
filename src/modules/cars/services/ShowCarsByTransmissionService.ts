import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Cars from "../infra/typeorm/entities/Cars";
import ICarsRepository from "../interfaces/ICarsRepository";

interface Request {
  transmission: string;
}

@injectable()
class ShowCarsByTransmissionService {
  constructor(

    @inject('CarsRepository')
    private carsRepository: ICarsRepository

  ){}

  public async execute({ transmission }: Request): Promise<Cars[]> {
    const cars = await this.carsRepository.findByTransmission(transmission);

    if (!cars) {
        throw new AppError('Car not found');
    }

    return cars;
  }
}

export default ShowCarsByTransmissionService;
