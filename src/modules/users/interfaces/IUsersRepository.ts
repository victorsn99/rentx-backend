import ICreateUserDTO from "../dtos/ICreateUserDTO";
import User from "../infra/typeorm/entities/User";

export default interface IUsersRepository {
    findAllProvidersExceptTheIdEntered(except_id?: string): Promise<User[]>;
    findById(id: string): Promise<User | undefined>;
    isRental(id: string): Promise<boolean | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    findByCpfOrCnpj(cpf_cnpj: string): Promise<User | undefined>;
    create(data: ICreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
}