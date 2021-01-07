import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Insurance from "../infra/typeorm/entities/Insurance";
import IInsuranceRepository from "../interfaces/IInsuranceRepository";

interface Request {
    insurance_id: string;
}

@injectable()
class ShowInsuranceByIdService {
  constructor(

    @inject('InsuranceRepository')
    private insuranceRepository: IInsuranceRepository

  ){}

  public async execute({ insurance_id }: Request): Promise<Insurance> {
    const insurance = await this.insuranceRepository.findById(insurance_id);

    if (!insurance) {
        throw new AppError('Insurance not found');
    }

    return insurance;
  }
}

export default ShowInsuranceByIdService;
