import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '../../infra/typeorm/entities/Insurance';
import { uuid } from 'uuidv4';

class FakeUsersRepository implements IUsersRepository {
    private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async findAllProvidersExceptTheIdEntered(except_id: string): Promise<User[]> {
    let { users } = this;

    if (except_id) {
      users = this.users.filter(user => user.id !== except_id);
    }
    return users;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid()}, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

}

export default FakeUsersRepository;