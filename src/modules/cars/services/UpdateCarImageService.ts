import { injectable, inject } from 'tsyringe';
import User from "@modules/users/infra/typeorm/entities/User";
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ICarsRepository from '../interfaces/ICarsRepository';
import Cars from '../infra/typeorm/entities/Cars';

interface Request {
  car_id: string,
  imageFilename: string,
}

@injectable()
class UpdateCarImageService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
    ) {}

  public async execute({ car_id, imageFilename }: Request): Promise<Cars> {

    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError('Only authenticated users can change image.', 401);
    }

    if (car.image) {
      await this.storageProvider.deleteFile(car.image); //deleta image anterior e abaixo cadastra um novo
    }

    const fileName = await this.storageProvider.saveFile(imageFilename);

    car.image = fileName;

    await this.carsRepository.save(car);

    return car;
  }
}

export default UpdateCarImageService;
