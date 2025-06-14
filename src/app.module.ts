import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from "./auth/auth.module";
import { User } from "./auth/auth.entity";

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
  ],
})
export class AppModule {}
