import { injectable, inject } from 'tsyringe';
import User from "@modules/users/infra/typeorm/entities/User";
import AppError from '@shared/errors/AppError';
import IUsersRepository from "../interfaces/IAdressRepository";

interface Request {
    user_id: string;
}

@injectable()
class DeleteAdressService {
  constructor(
    @inject('AdressRepository')
    private adressRepository: IUsersRepository 
    
    ){}

  public async execute({ user_id }: Request): Promise<void> {
    const adress = await this.adressRepository.delete(user_id);
  }
}

export default DeleteAdressService;
