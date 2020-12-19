import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Cars from "../infra/typeorm/entities/Cars";
import ICarsRepository from "../interfaces/ICarsRepository";

interface Request {
    name: string;
}

@injectable()
class ShowCarsByNameService {
  constructor(

    @inject('CarsRepository')
    private carsRepository: ICarsRepository

  ){}

  public async execute({ name }: Request): Promise<Cars[]> {
    const cars = await this.carsRepository.findByName(name);

    if (!cars) {
        throw new AppError('Car not found');
    }

    return cars;
  }
}

export default ShowCarsByNameService;
