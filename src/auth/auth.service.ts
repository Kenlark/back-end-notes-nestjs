import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./auth.entity";
import { JwtService } from "@nestjs/jwt"; // Importer le JwtService
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService // Injection du JwtService
  ) {}

  // Méthode pour récupérer tous les utilisateurs
  async findAll() {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      throw new HttpException(
        "Error fetching users",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Méthode pour créer un nouvel utilisateur
  async create(user: Partial<User>) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      const newUser = this.usersRepository.create({
        ...user,
        password: hashedPassword, // Utiliser le mot de passe haché
      });
      return await this.usersRepository.save(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      throw new HttpException("Error creating user", HttpStatus.BAD_REQUEST);
    }
  }

  // Méthode pour gérer la connexion (signIn) avec JWT
  async signIn(credentials: {
    email: string;
    password: string;
    username: string;
  }) {
    const user = await this.usersRepository.findOne({
      where: [{ email: credentials.email }, { username: credentials.username }],
    });

    if (!user) {
      throw new HttpException(
        "Invalid email or password",
        HttpStatus.UNAUTHORIZED
      );
    }

    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new HttpException(
        "Invalid email or password",
        HttpStatus.UNAUTHORIZED
      );
    }

    // Générer un token JWT après une connexion réussie
    const payload = { id: user.id, email: user.email };
    const token = this.jwtService.sign(payload); // Générer le token

    return {
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
      },
      access_token: token, // Renvoyer le token
    };
  }
}
