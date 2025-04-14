import { Controller, Delete, Get, HttpCode, Post, Put } from "@nestjs/common";

@Controller("notes")
export class NotesController {
  @Get("list")
  @HttpCode(200)
  getAll() {
    return "List of notes";
  }
  @Post("create")
  @HttpCode(201)
  create() {
    return "Create a note";
  }
  @Put("edit")
  @HttpCode(200)
  edit() {
    return "Edit a note";
  }
  @Delete("delete")
  @HttpCode(200)
  delete() {
    return "Delete a note";
  }
}
