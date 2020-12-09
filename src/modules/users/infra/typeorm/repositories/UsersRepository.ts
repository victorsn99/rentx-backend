import { getRepository, Repository, Not } from 'typeorm';
import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '../entities/User';
import usersRouter from '../../http/routes/users.routes';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;
  constructor() {
    this.ormRepository = getRepository(User);
  }


  public async findByCpfOrCnpj(cpf_cnpj: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { cpf_cnpj },
    });

    return findUser;
  }

  public async findById(id: string): Promise<User | undefined> {

    const findUser = await this.ormRepository.findOne({
      where: { id },
    });

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {

    const findUser = await this.ormRepository.findOne({
      where: { email },
    });

    return findUser;
  }

  public async findAllProvidersExceptTheIdEntered(except_id: string): Promise<User[]> {
    let users: User[];

    if (except_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(except_id),
        }
      });
    } else {
      users = await this.ormRepository.find();
    }
    return users;
  }

  public async create({ name, email, password, cpf_cnpj, is_rental }: ICreateUserDTO): Promise<User> {
    const user = await this.ormRepository.create({ name, email, password, cpf_cnpj, is_rental});

    console.log('TYPEORM: ', user);

    return user;
  }

  public async save(user: User): Promise<User> {

    const userSaved = await this.ormRepository.save(user);

    return userSaved;

  }

}

export default UsersRepository;
