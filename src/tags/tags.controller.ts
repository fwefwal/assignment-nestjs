import { Get } from "@nestjs/common";
import { Controller } from '@nestjs/common';
import { TagsService } from "./tags.service";

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) { }

  @Get()
  getTags() {
    return this.tagsService.findAll()
  }

}
