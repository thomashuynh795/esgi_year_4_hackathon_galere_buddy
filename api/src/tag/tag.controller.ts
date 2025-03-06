import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";

import {CreateTagDto} from "./dto/create-tag.dto";
import {UpdateTagDto} from "./dto/update-tag.dto";
import {TagService} from "./tag.service";


@Controller("tag")
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto.name);
  }

  @Get()
  findAll() {
    return this.tagService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.tagService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(id, updateTagDto.name);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.tagService.delete(id);
  }
}
