import Adress from '@modules/adress/infra/typeorm/entities/Adress';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IAdressRepository from '../interfaces/IAdressRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';


interface Request {
  street: string;
  number: number;
  neighborhood: string;
  zip_code: string;
  city: string;
  state: string;
  country: string;
}

@injectable()
class CreateAdressService {
  constructor(
    @inject('AdressRepository')
    private adressRepository: IAdressRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
    ) {}

  public async execute({street, number, neighborhood, zip_code, city, state, country}: Request): Promise<Adress> {

    const adress = await this.adressRepository.create({
      street, number, neighborhood, zip_code, city, state, country
    });

    await this.cacheProvider.invalidatePrefix('adress-list');

    await this.adressRepository.save(adress);

    return adress;
  }
}

export default CreateAdressService;
