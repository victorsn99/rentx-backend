import ICreatecarDTO from "../dtos/ICreateCarsDTO";
import Cars from "../infra/typeorm/entities/Cars";

export default interface ICarssRepository {
    findById(id: string): Promise<Cars | undefined>;
    increaseQuantity(id: string): Promise<Cars>;
    decreaseQuantity(id: string): Promise<Cars>;
    findById(id: string): Promise<Cars | undefined>;
    findByName(name: string): Promise<Cars[] | undefined>;
    findByFuel(fuel: string): Promise<Cars[] | undefined>;
    findByTransmission(transmission: string): Promise<Cars[] | undefined>;
    findByType(type: string): Promise<Cars[] | undefined>;
    returnQuantity(id: string): Promise<number>;
    create(data: ICreatecarDTO): Promise<Cars>;
    save(Cars: Cars): Promise<Cars>;
    delete(id: string): Promise<void>; 
}