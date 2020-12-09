import { injectable, inject } from 'tsyringe';
import Adress from "@modules/adress/infra/typeorm/entities/Adress";
import AppError from '@shared/errors/AppError';
import IAdressRepository from '../interfaces/IAdressRepository';

interface Request {
  adress_id: string;
  street: string;
  number: number;
  neighborhood: string;
  zip_code: string;
  city: string;
  state: string;
  country: string;
}

@injectable()
class UpdateAdressService {
  constructor(
    @inject('AdressRepository')
    private adressRepository: IAdressRepository,
    ) {}

  public async execute({ adress_id, street, number, neighborhood, zip_code, city, state, country }: Request): Promise<Adress> {
    const adress = await this.adressRepository.findById(adress_id);

    if (!adress) {
        throw new AppError('Adress not found');
    }

    adress.street = street;
    adress.number = number;
    adress.neighborhood = neighborhood;
    adress.zip_code = zip_code;
    adress.city = city;
    adress.state = state;
    adress.country = country;

    return this.adressRepository.save(adress);
  }
}

export default UpdateAdressService;
