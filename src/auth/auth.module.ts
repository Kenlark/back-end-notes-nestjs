import { Module } from "@nestjs/common";

import { UsersService } from "./auth.service";
import { UsersController } from "./auth.controller";
import { User } from "./auth.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Importation du module TypeOrmModule pour la gestion de la base de données
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Export UsersService pour pouvoir l'utiliser dans d'autres modules
})
export class AuthModule {}
