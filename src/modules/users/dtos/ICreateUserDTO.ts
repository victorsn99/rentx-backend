export default interface ICreateUserDTO {
    name: string;
    email: string;
    password: string;
    cpf_cnpj: string;
    is_rental: boolean;
    adress_id?: string;
}