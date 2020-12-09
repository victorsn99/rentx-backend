import IAdressRepository from '@modules/adress/interfaces/IAdressRepository';
import ICreateAdressDTO from '@modules/adress/dtos/ICreateAdressDTO';
import Adress from '../../infra/typeorm/entities/Adress';
import { uuid } from 'uuidv4';

class FakeAdressRepository implements IAdressRepository {
    private adresses: Adress[] = [];

  public async findById(id: string): Promise<Adress | undefined> {
    const findAdress = this.adresses.find(adress => adress.id === id);

    return findAdress;
  }

  public async create(adressData: ICreateAdressDTO): Promise<Adress> {
    const adress = new Adress();

    Object.assign(adress, { id: uuid()}, adressData);

    this.adresses.push(adress);

    return adress;
  }

  public async save(adress: Adress): Promise<Adress> {
    const findIndex = this.adresses.findIndex(findAdress => findAdress.id === adress.id);

    this.adresses[findIndex] = adress;

    return adress;
  }

  public async delete(adress_id: string): Promise<void> {
    //this.adresses.splice(adress_id);
  }

}

export default FakeAdressRepository;
