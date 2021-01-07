import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Insurance from '../infra/typeorm/entities/Insurance';
import IInsuranceRepository from '../interfaces/IInsuranceRepository';

interface Request {
  insurance_id: string;
  name: string;
  description: string;
  value: number;
}

@injectable()
class UpdateInsuranceService {
  constructor(
    @inject('InsuranceRepository')
    private insuranceRepository: IInsuranceRepository,
    ) {}

  public async execute({ insurance_id, name, 
    description,
    value
  }: Request): Promise<Insurance> {

      const insurance = await this.insuranceRepository.findById(insurance_id);

      if (!insurance) {
          throw new AppError('Insurance not found');
      }

      insurance.name = name;
      insurance.description = description;
      insurance.value = value;

      return this.insuranceRepository.save(insurance);
  }
}

export default UpdateInsuranceService;
