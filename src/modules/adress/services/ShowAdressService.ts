import Adress from "@modules/adress/infra/typeorm/entities/Adress";
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IAdressRepository from "../interfaces/IAdressRepository";

interface Request {
    adress_id: string;
}

@injectable()
class ShowAdressService {
  constructor(

    @inject('AdressRepository')
    private adressRepository: IAdressRepository

  ){}

  public async execute({ adress_id }: Request): Promise<Adress> {
    const adress = await this.adressRepository.findById(adress_id);

    if (!adress) {
        throw new AppError('Adress not found');
    }

    return adress;
  }
}

export default ShowAdressService;
