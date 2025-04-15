import { Module } from "@nestjs/common";

import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { User } from "./users.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Importation du module TypeOrmModule pour la gestion de la base de données
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Export UsersService pour pouvoir l'utiliser dans d'autres modules
})
export class UsersModule {}
