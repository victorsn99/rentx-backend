import User from '@modules/users/infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/interfaces/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IInsuranceRepository from '../interfaces/IInsuranceRepository';
import Insurance from '../infra/typeorm/entities/Insurance';

interface Request {
    name: string;
    description: string;
    value: number;
}

@injectable()
class CreateInsuranceService {
  constructor(
    //@inject('UsersRepository')
    //private usersRepository: IUsersRepository,

    @inject('InsuranceRepository')
    private insuranceRepository: IInsuranceRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
    ) {}

  public async execute({ name, 
    description, 
    value,
  }: Request): Promise<Insurance> {
    
    //const userIsRental = await this.usersRepository.isRental(rental_id);

    //if (!userIsRental) {
    //  throw new AppError('You should be an rental to register a insurance.', 401);
    //}

    const insurance = await this.insuranceRepository.create({
      name,
      description, 
      value
    });

    await this.cacheProvider.invalidatePrefix('cars-list');

    await this.insuranceRepository.save(insurance);

    return insurance;
  }
}

export default CreateInsuranceService;
