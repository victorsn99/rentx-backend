import { getRepository, Repository, Not, Like, QueryBuilder } from 'typeorm';
import Rentals from '../../entities/Rentals';
import { parseISO } from 'date-fns';
import IRentalsRentalRepository from '@modules/rental/interfaces/rental/IRentalsCarRentalRepository';

class RentalsUsersRepository implements IRentalsRentalRepository {
  private ormRepository: Repository<Rentals>;
  constructor() {
    this.ormRepository = getRepository(Rentals);
  }

  public async findByActive(user_id: string): Promise<Rentals[] | undefined> {
    const findRent = await this.ormRepository.find({
      where: {
        is_active: true,
        user_id,
      },
    });

      return findRent;  
    }
  
  public async findByInactive(user_id: string): Promise<Rentals[] | undefined> {
    const findRent = await this.ormRepository.find({
      where: {
        is_active: false,
        user_id,
      },
    });

      return findRent;  
    }
  
  public async findByEndDate(user_id: string, date: Date): Promise<Rentals[] | undefined> {
    const findRent = await this.ormRepository.find({
      where: {
        end_date: date,
        user_id
      },
    });

      return findRent;  
    }
  
  public async findByStartDate(user_id: string, date: Date): Promise<Rentals[] | undefined> {
    const findRent = await this.ormRepository.find({
      where: {
        start_date: date,
        user_id
      },
    });

      return findRent;  
    }

    public async orderByEndDate(user_id: string): Promise<Rentals[] | undefined> {
      const findRent = await this.ormRepository.query(`SELECT * FROM rentals WHERE rentals.user_id = '${user_id}' ORDER BY rentals.end_date;`);
  
        return findRent;  
      }
    
    public async orderByStartDate(user_id: string): Promise<Rentals[] | undefined> {
      const findRent = await this.ormRepository.query(`SELECT * FROM rentals WHERE rentals.user_id = '${user_id}' ORDER BY rentals.start_date;`);
  
        return findRent;  
      }

  public async findAll(user_id: string): Promise<Rentals[] | undefined> {
    const findRent = await this.ormRepository.query(`SELECT rentals.id, rentals.total_value, rentals.start_date, rentals.end_date, users.name as user_name, users.cpf_cnpj, cars.name as car_name, rentals.is_active, insurance.name as insurance_name FROM rentals inner join insurance on rentals.insurance_id = insurance.id inner join users on rentals.user_id = users.id inner join cars on rentals.car_id = cars.id WHERE rentals.user_id = '${user_id}';`);

    return findRent;
  }

}

export default RentalsUsersRepository;
