import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Insurance from "../infra/typeorm/entities/Insurance";
import IInsuranceRepository from "../interfaces/IInsuranceRepository";

@injectable()
class ShowAllInsurancesService {
  constructor(

    @inject('InsuranceRepository')
    private insuranceRepository: IInsuranceRepository

  ){}

  public async execute(): Promise<Insurance[]> {
    const insurance = await this.insuranceRepository.findAll();

    if (!insurance) {
        throw new AppError('Insurances not found');
    }

    return insurance;
  }
}

export default ShowAllInsurancesService;
