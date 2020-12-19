import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Cars from "../infra/typeorm/entities/Cars";
import ICarsRepository from "../interfaces/ICarsRepository";

interface Request {
    fuel: string;
}

@injectable()
class ShowCarsByFuelService {
  constructor(

    @inject('CarsRepository')
    private carsRepository: ICarsRepository

  ){}

  public async execute({ fuel }: Request): Promise<Cars[]> {
    const cars = await this.carsRepository.findByFuel(fuel);

    if (!cars) {
        throw new AppError('Car not found');
    }

    return cars;
  }
}

export default ShowCarsByFuelService;
