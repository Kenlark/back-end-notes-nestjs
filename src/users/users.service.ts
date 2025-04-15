import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./users.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      // Lancer l'exception avec un message d'erreur et un statut
      throw new HttpException(
        "Error fetching users",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async create(user: Partial<User>): Promise<User> {
    try {
      const newUser = this.usersRepository.create(user);
      return await this.usersRepository.save(newUser);
    } catch (error) {
      // Lancer l'exception avec un message d'erreur et un statut
      throw new HttpException("Error creating user", HttpStatus.BAD_REQUEST);
    }
  }
}
