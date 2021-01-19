import Rentals from "../../infra/typeorm/entities/Rentals";

export default interface IRentalsCarRentalRepository {

    findAll(car_rental_id: string): Promise<Rentals[] | undefined>;
    findByEndDate(car_rental_id: string, date: Date): Promise<Rentals[] | undefined>;
    findByStartDate(car_rental_id: string, date: Date): Promise<Rentals[] | undefined>;
    findByActive(car_rental_id: string): Promise<Rentals[] | undefined>;
    findByInactive(car_rental_id: string): Promise<Rentals[] | undefined>;
    orderByStartDate(car_rental_id: string): Promise<Rentals[] | undefined>;
    orderByEndDate(car_rental_id: string): Promise<Rentals[] | undefined>;
}