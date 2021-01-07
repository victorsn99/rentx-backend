import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Insurance from '../infra/typeorm/entities/Insurance';
import IInsuranceRepository from '../interfaces/IInsuranceRepository';

interface Request {
  insurance_id: string;
}

@injectable()
class DeleteInsuranceService {
  constructor(
    @inject('InsuranceRepository')
    private insuranceRepository: IInsuranceRepository,
    ) {}

  public async execute({ insurance_id }: Request): Promise<void> {

      const insurance = await this.insuranceRepository.findById(insurance_id);

      if (!insurance) {
          throw new AppError('insurance not found');
      }

      this.insuranceRepository.delete(insurance_id);
  }
}

export default DeleteInsuranceService;
