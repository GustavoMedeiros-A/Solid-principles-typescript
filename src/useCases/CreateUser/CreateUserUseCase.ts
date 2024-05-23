import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUser.dto";

export class CreateUserUseCase {
  // Caso de uso só chama o "contrato" e faz a regra de negocio
  constructor(
    private usersRepository: IUsersRepository, // Private create the instance to this class
    private mailProvider: IMailProvider
  ) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const user = new User(data);

    await this.usersRepository.save(user);

    this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: "Empresa",
        email: "Empresa@empresa.com",
      },
      subject: "Bem vindo!!",
      body: "Pode começar a usar a plataforma",
    });
  }
}
