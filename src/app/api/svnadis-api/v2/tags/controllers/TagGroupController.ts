import {Controller, Get, UseGuards} from "@nestjs/common";
import {TagGroupService} from "../services/TagGroupService";
import {ApiResponse, ApiUseTags} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";
import {TagGroupEntity} from "../entities/TagGroup.entity";

@ApiUseTags('tag-group')
@Controller('tag-group')
export class TagGroupController {
    constructor(private tagGroupService: TagGroupService) {
    }

    @ApiResponse({status: 200, type: TagGroupEntity, isArray: true, description: 'Returns all Tags'})
    @Get()
    @UseGuards(AuthGuard('bearer'))
    public findAll(): Promise<TagGroupEntity[]> {
        return this.tagGroupService.findAll();
    }
}
