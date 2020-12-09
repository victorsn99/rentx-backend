import ICreateAdressDTO from "../dtos/ICreateAdressDTO";
import Adress from "../infra/typeorm/entities/Adress";

export default interface IAdressRepository {
    findById(id: string): Promise<Adress | undefined>;
    create(data: ICreateAdressDTO): Promise<Adress>;
    save(adress: Adress): Promise<Adress>;
    delete(adress_id: string): Promise<void>;
}