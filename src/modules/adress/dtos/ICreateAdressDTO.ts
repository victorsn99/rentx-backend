export default interface ICreateAdressDTO {
    adress_id?: string;
    street: string;
    number: number;
    neighborhood: string;
    zip_code: string;
    city: string;
    state: string;
    country: string;
}