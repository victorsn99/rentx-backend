import ICreateRentalDTO from "../dtos/ICreateRentalDTO";
import Rentals from "../infra/typeorm/entities/Rentals";

export default interface IRentalsRepository {

    findById(id: string): Promise<Rentals | undefined>;
    isActive(id: string): Promise<boolean>;
    create(data: ICreateRentalDTO): Promise<Rentals>;
    save(Rentals: Rentals): Promise<Rentals>;
    delete(id: string): Promise<void>;
}