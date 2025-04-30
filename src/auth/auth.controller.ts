import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { UsersService } from "./auth.service";
import { User } from "./auth.entity";

@Controller("auth")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // List route for getting all users
  @Get("list")
  @HttpCode(HttpStatus.OK) // Code HTTP 200
  async getAllUsers() {
    return this.usersService.findAll();
  }

  // Create route for creating a new user
  @Post("create")
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() user: Partial<User>) {
    return this.usersService.create(user);
  }
}
