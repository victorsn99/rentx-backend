import { getRepository, Repository, Not } from 'typeorm';
import IAdressRepository from '@modules/adress/interfaces/IAdressRepository';
import ICreateAdressDTO from '@modules/adress/dtos/ICreateAdressDTO';
import Adress from '../entities/Adress';
import usersRouter from '../../http/routes/adress.routes';

class AdressRepository implements IAdressRepository {
  private ormRepository: Repository<Adress>;
  constructor() {
    this.ormRepository = getRepository(Adress);
  }

  public async findById(id: string): Promise<Adress | undefined> {

    const findAdress = await this.ormRepository.findOne({
      where: { id },
    });

    return findAdress;
  }

  public async create({ street, number, neighborhood, zip_code, city, state, country }: ICreateAdressDTO): Promise<Adress> {
    const adress = await this.ormRepository.create({ street, number, neighborhood, zip_code, city, state, country });

    console.log('TYPEORM: ', adress);

    return adress;
  }

  public async delete(adress_id: string): Promise<void> {
    await this.ormRepository.delete(adress_id);
  }

  public async save(adress: Adress): Promise<Adress> {

    const adressSaved = await this.ormRepository.save(adress);

    return adressSaved;

  }

}

export default AdressRepository;
