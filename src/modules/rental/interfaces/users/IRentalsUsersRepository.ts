import Rentals from "../../infra/typeorm/entities/Rentals";

export default interface IRentalsUsersRepository {
    findAll(user_id: string): Promise<Rentals[] | undefined>;
    findByEndDate(user_id: string, date: Date): Promise<Rentals[] | undefined>;
    findByStartDate(user_id: string, date: Date): Promise<Rentals[] | undefined>;
    findByActive(user_id: string): Promise<Rentals[] | undefined>;
    findByInactive(user_id: string): Promise<Rentals[] | undefined>;
    orderByStartDate(user_id: string): Promise<Rentals[] | undefined>;
    orderByEndDate(user_id: string): Promise<Rentals[] | undefined>;
}