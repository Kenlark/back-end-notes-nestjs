import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Put,
} from "@nestjs/common";

@Controller("users")
export class UsersController {
  @Get("list")
  @HttpCode(200)
  getAll() {
    return "List of users";
  }
  @Post("create")
  @HttpCode(201)
  create() {
    return "Create a user";
  }
  @Put("edit")
  @HttpCode(200)
  edit() {
    return "Edit a user";
  }
  @Delete("delete")
  @HttpCode(200)
  delete() {
    return "Delete a user";
  }
  @Get("profile")
  @HttpCode(200)
  profile() {
    return "User profile";
  }
  @Get("settings")
  @HttpCode(200)
  settings() {
    return "User settings";
  }
}
