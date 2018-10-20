import {Controller, Get, Query, UseGuards} from "@nestjs/common";
import {TagEntity} from "../entities/Tag.entity";
import {TagService} from "../services/TagService";
import {ApiResponse, ApiUseTags} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport/dist/auth.guard";
import {Pageable, PageRequest} from "../../../../../common/typeorm/pagination/Pageable";

@ApiUseTags('tag')
@Controller('tag')
export class TagController {
    constructor(private tagService: TagService) {
    }

    @ApiResponse({status: 200, type: TagEntity, isArray: true, description: 'Returns all Tags'})
    @Get()
    @UseGuards(AuthGuard('bearer'))
    public findAll(@Query() params: PageRequest): Promise<Pageable<TagEntity>> {
        return this.tagService.findAll(params);
    }

    @ApiResponse({status: 200, type: TagEntity, isArray: true, description: 'Filter Tags'})
    @Get('/filter')
    @UseGuards(AuthGuard('bearer'))
    public filter(@Query('filter') filterString: string): Promise<TagEntity[]> {
        return this.tagService.filter(filterString);
    }
}
