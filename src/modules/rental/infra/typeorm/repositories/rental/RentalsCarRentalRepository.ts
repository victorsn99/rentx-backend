import { getRepository, Repository, Not, Like, QueryBuilder } from 'typeorm';
import Rentals from '../../entities/Rentals';
import { parseISO } from 'date-fns';
import IRentalsRentalRepository from '@modules/rental/interfaces/rental/IRentalsCarRentalRepository';

class RentalsCarRentalRepository implements IRentalsRentalRepository {
  private ormRepository: Repository<Rentals>;
  constructor() {
    this.ormRepository = getRepository(Rentals);
  }

  public async findByActive(car_rental_id: string): Promise<Rentals[] | undefined> {
    const findRent = await this.ormRepository.find({
      where: {
        is_active: true,
        car_rental_id,
      },
    });

      return findRent;  
    }
  
  public async findByInactive(car_rental_id: string): Promise<Rentals[] | undefined> {
    const findRent = await this.ormRepository.find({
      where: {
        is_active: false,
        car_rental_id,
      },
    });

      return findRent;  
    }
  
  public async findByEndDate(car_rental_id: string, date: Date): Promise<Rentals[] | undefined> {
    const findRent = await this.ormRepository.find({
      where: {
        end_date: date,
        car_rental_id
      },
    });

      return findRent;  
    }
  
  public async findByStartDate(car_rental_id: string, date: Date): Promise<Rentals[] | undefined> {
    const findRent = await this.ormRepository.find({
      where: {
        start_date: date, 
        car_rental_id
      },
    });

      return findRent;  
    }

    public async orderByEndDate(car_rental_id: string): Promise<Rentals[] | undefined> {
      const findRent = await this.ormRepository.query(`SELECT * FROM rentals WHERE rentals.car_rental_id = '${car_rental_id}' ORDER BY rentals.end_date;`);
  
        return findRent;
      }
    
    public async orderByStartDate(car_rental_id: string): Promise<Rentals[] | undefined> {
      const findRent = await this.ormRepository.query(`SELECT * FROM rentals WHERE rentals.car_rental_id = '${car_rental_id}' ORDER BY rentals.start_date;`);
  
        return findRent;  
      }


  public async findAll(car_rental_id: string): Promise<Rentals[] | undefined> {
    const findRent = await this.ormRepository.query(`SELECT rentals.id, rentals.total_value, rentals.start_date, rentals.end_date, users.name as user_name, users.cpf_cnpj, cars.name as car_name, rentals.is_active, insurance.name as insurance_name FROM rentals inner join insurance on rentals.insurance_id = insurance.id inner join users on rentals.user_id = users.id inner join cars on rentals.car_id = cars.id WHERE rentals.car_rental_id = '${car_rental_id}';`);

    return findRent;
  }

}

export default RentalsCarRentalRepository;
