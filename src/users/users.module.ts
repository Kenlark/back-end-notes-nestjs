import { Module } from "@nestjs/common";

import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Export UsersService pour pouvoir l'utiliser dans d'autres modules
})
export class UsersModule {}
