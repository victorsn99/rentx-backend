import { getRepository, Repository, Not, Like } from 'typeorm';
import IInsuranceRepository from '@modules/insurance/interfaces/IInsuranceRepository';
import ICreateInsuranceDTO from '@modules/insurance/dtos/ICreateInsuranceDTO';
import Insurance from '../entities/Insurance';

class InsuranceRepository implements IInsuranceRepository {
  private ormRepository: Repository<Insurance>;
  constructor() {
    this.ormRepository = getRepository(Insurance);
  }
  
  public async findAll(): Promise<Insurance[] | undefined> {
    const insurance = await this.ormRepository.query("SELECT * FROM insurance");

    return insurance;
  }

  public async findById(id: string): Promise<Insurance | undefined> {
    const insurance = await this.ormRepository.findOne({
      where: {
        id
      }
    });

    return insurance;
  }

  public async delete(id: string): Promise<void> {

    await this.ormRepository.delete(id);

  }

  public async create({ name, description, value }: ICreateInsuranceDTO): Promise<Insurance> {
    const insurance = this.ormRepository.create({ name, 
      description,
      value });

    console.log('TYPEORM: ', insurance);

    return insurance;
  }

  public async save(insurance: Insurance): Promise<Insurance> {

    const carSaved = await this.ormRepository.save(insurance);

    return carSaved;

  }

}

export default InsuranceRepository;
