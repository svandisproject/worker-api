import {Controller, Get} from "@nestjs/common";
import {TagEntity} from "../entities/Tag.entity";
import {TagService} from "../services/TagService";
import {ApiResponse, ApiUseTags} from "@nestjs/swagger";

@ApiUseTags('tag')
@Controller('tag')
export class TagController {
    constructor(private tagService: TagService) {
    }

    @ApiResponse({status: 200, type: TagEntity, isArray: true, description: 'Returns all Tags'})
    @Get()
    public findAll(): Promise<TagEntity[]> {
        return this.tagService.findAll();
    }
}
