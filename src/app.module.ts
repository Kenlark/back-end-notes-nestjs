import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from "./auth/auth.module";
import { NotesModule } from "./notes/notes.module";
import { UsersModule } from "./users/users.module";
import { User } from "./users/users.entity";

@Module({
  imports: [
    // Charge les variables d'env de manière globale
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configuration TypeORM avec accès à ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_NAME"),
        entities: [User],
        synchronize: true,
      }),
    }),

    AuthModule,
    UsersModule,
    NotesModule,
  ],
})
export class AppModule {}
