export default interface ICreateRentalDTO {
    car_rental_id: string;
    user_id: string;
    car_id: string;
    insurance_id?: string;
    total_value: number;
    is_active: boolean;
    start_date: Date;
    end_date: Date;
}