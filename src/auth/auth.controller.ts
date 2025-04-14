import { Controller, Get, HttpCode, Post } from "@nestjs/common";

@Controller("auth")
export class AuthController {
  @Post("login")
  @HttpCode(200)
  login() {
    return "Login page";
  }
  @Post("register")
  @HttpCode(201)
  register() {
    return "Register page";
  }
  @Post("logout")
  @HttpCode(200)
  logout() {
    return "Logout page";
  }
  @Get("profile")
  @HttpCode(200)
  profile() {
    return "Profile page";
  }
  @Get("settings")
  @HttpCode(200)
  settings() {
    return "Settings page";
  }
}
