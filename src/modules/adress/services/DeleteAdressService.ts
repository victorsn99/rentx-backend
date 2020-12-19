import { injectable, inject } from 'tsyringe';
import User from "@modules/users/infra/typeorm/entities/User";
import AppError from '@shared/errors/AppError';
import IUsersRepository from "../interfaces/IAdressRepository";

interface Request {
    adress_id: string;
}

@injectable()
class DeleteAdressService {
  constructor(
    @inject('AdressRepository')
    private adressRepository: IUsersRepository 
    
    ){}

  public async execute({ adress_id }: Request): Promise<void> {
    await this.adressRepository.delete(adress_id);
  }
}

export default DeleteAdressService;
