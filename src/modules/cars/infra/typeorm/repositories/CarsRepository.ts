import { getRepository, Repository, Not, Like } from 'typeorm';
import ICarsRepository from '@modules/cars/interfaces/ICarsRepository';
import ICreateCarsDTO from '@modules/cars/dtos/ICreateCarsDTO';
import Cars from '../entities/Cars';

class CarsRepository implements ICarsRepository {
  private ormRepository: Repository<Cars>;
  constructor() {
    this.ormRepository = getRepository(Cars);
  }
  
  public async findByName(name: string): Promise<Cars[] | undefined> {
    const findCar = await this.ormRepository.find({
      name: Like(`%${name}%`),
    });

    return findCar;
  }
  
  public async findByFuel(fuel: string): Promise<Cars[] | undefined> {
    const findCar = await this.ormRepository.find({
      fuel: Like(`%${fuel}%`),
    });

      return findCar;  
    }
  
  public async findByTransmission(transmission: string): Promise<Cars[] | undefined> {
    const findCar = await this.ormRepository.find({
      transmission: Like(`%${transmission}%`),
    });

      return findCar;  
    }
  
  public async findByType(type: string): Promise<Cars[] | undefined> {
    const findCar = await this.ormRepository.find({
      type: Like(`%${type}%`),
    });

      return findCar;
  }

  public async findById(id: string): Promise<Cars | undefined> {

    const findCar = await this.ormRepository.findOne({
      where: { id },
    });

    return findCar;
  }

  public async delete(id: string): Promise<void> {

    await this.ormRepository.delete(id);

  }

  public async create({ name,
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
    color }: ICreateCarsDTO): Promise<Cars> {
    const car = this.ormRepository.create({ name, 
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
      color });

    console.log('TYPEORM: ', car);

    return car;
  }

  public async save(car: Cars): Promise<Cars> {

    const carSaved = await this.ormRepository.save(car);

    return carSaved;

  }

}

export default CarsRepository;
