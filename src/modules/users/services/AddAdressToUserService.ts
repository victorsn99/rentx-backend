import { injectable, inject } from 'tsyringe';
import User from "@modules/users/infra/typeorm/entities/User";
import AppError from '@shared/errors/AppError';
import IUsersRepository from "../interfaces/IUsersRepository";
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
    user_id: string;
    adress_id: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
    ) {}

  public async execute({ user_id, adress_id }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
        throw new AppError('User not found');
    }

    user.adress_id = adress_id;

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
