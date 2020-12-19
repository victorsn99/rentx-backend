import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Cars from '../infra/typeorm/entities/Cars';
import ICarsRepository from '../interfaces/ICarsRepository';

interface Request {
  car_id: string;
  name: string;
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
class UpdateCarsService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    ) {}

  public async execute({ car_id, name, 
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

      const car = await this.carsRepository.findById(car_id);

      if (!car) {
          throw new AppError('Car not found');
      }

      car.name = name;
      car.brand = brand;
      car.daily_value = daily_value;
      car.category = category; 
      car.fuel = fuel;
      car.horsepower = horsepower;
      car.engine = engine;
      car.transmission = transmission;
      car.type = type;
      car.quantity = quantity; 
      car.color = color;

      return this.carsRepository.save(car);
  }
}

export default UpdateCarsService;
