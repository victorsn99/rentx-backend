import ICreateInsuranceDTO from "../dtos/ICreateInsuranceDTO";
import Insurance from "../infra/typeorm/entities/Insurance";

export default interface IInsuranceRepository {
    findAll(): Promise<Insurance[] | undefined>;
    findById(id: string): Promise<Insurance | undefined>;
    create(data: ICreateInsuranceDTO): Promise<Insurance>;
    save(Insurance: Insurance): Promise<Insurance>;
    delete(id: string): Promise<void>; 
}