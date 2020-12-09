import User from '@modules/users/infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../interfaces/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';


interface Request {
  name: string;
  email: string;
  password: string;
  cpf_cnpj: string;
  is_rental: boolean;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
    ) {}

  public async execute({name, email, password, cpf_cnpj, is_rental}: Request): Promise<User> {

    const checkEmailExists = await this.usersRepository.findByEmail(email);

    if (checkEmailExists) {
      throw new AppError('Email address already used.', 400);
    }

    const checkCpfOrCnpjExists = await this.usersRepository.findByCpfOrCnpj(cpf_cnpj);

    if (checkCpfOrCnpjExists) {
      throw new AppError('CPF/CNPJ already used.', 400);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      cpf_cnpj,
      is_rental
    });

    await this.cacheProvider.invalidatePrefix('users-list');

    await this.usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
