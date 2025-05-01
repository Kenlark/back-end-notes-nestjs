import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UsersService } from "./auth.service";
import { UsersController } from "./auth.controller";
import { User } from "./auth.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config"; // Importation de ConfigService

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Importation du module TypeOrmModule pour la gestion de la base de données
    JwtModule.registerAsync({
      imports: [ConfigModule], // Assure-toi que ConfigModule est importé
      inject: [ConfigService], // Injecter ConfigService dans cette configuration
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"), // Utilisation de ConfigService pour obtenir JWT_SECRET
        signOptions: { expiresIn: "1h" }, // Expiration du token
      }),
    }),
  ], // Configuration du module JWT
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Export UsersService pour pouvoir l'utiliser dans d'autres modules
})
export class AuthModule {}
