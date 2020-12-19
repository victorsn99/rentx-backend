import ICreatecarDTO from "../dtos/ICreateCarsDTO";
import Cars from "../infra/typeorm/entities/Cars";

export default interface ICarssRepository {
    findById(id: string): Promise<Cars | undefined>;
    findByName(name: string): Promise<Cars[] | undefined>;
    findByFuel(fuel: string): Promise<Cars[] | undefined>;
    findByTransmission(transmission: string): Promise<Cars[] | undefined>;
    findByType(type: string): Promise<Cars[] | undefined>;
    create(data: ICreatecarDTO): Promise<Cars>;
    save(Cars: Cars): Promise<Cars>;
    delete(id: string): Promise<void>; 
}