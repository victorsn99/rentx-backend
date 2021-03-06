import { injectable, inject } from 'tsyringe';
import User from "@modules/users/infra/typeorm/entities/User";
import AppError from '@shared/errors/AppError';
import IUsersRepository from "../interfaces/IUsersRepository";
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
    user_id: string;
    name: string;
    email: string;
    old_password?: string;
    password?: string;
    cpf_cnpj: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
    ) {}

  public async execute({ user_id, name, email, password, old_password, cpf_cnpj }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
        throw new AppError('User not found');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
        throw new AppError('E-mail already used');
    }

    user.name = name;
    user.email = email;
    user.cpf_cnpj = cpf_cnpj;

    console.log('OLD PASSWORD: ', old_password);

    if (password && !old_password) {
        throw new AppError('Please insert your old password.')
    }

    if (password && old_password) {
        const checkOldPassword = await this.hashProvider.compareHash(old_password, user.password);

        if (!checkOldPassword) {
            throw new AppError('Old password is incorrect.')
        }

        user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
