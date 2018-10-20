import {Body, Controller, Delete, Get, Param, Post, Query, UseGuards} from "@nestjs/common";
import {TagGroupService} from "../services/TagGroupService";
import {ApiResponse, ApiUseTags} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";
import {TagGroupEntity} from "../entities/TagGroup.entity";

@ApiUseTags('tag-group')
@Controller('tag-group')
export class TagGroupController {
    constructor(private tagGroupService: TagGroupService) {
    }

    @ApiResponse({status: 200, type: TagGroupEntity, isArray: true, description: 'Returns all Tag groups'})
    @Get()
    @UseGuards(AuthGuard('bearer'))
    public findAll(): Promise<TagGroupEntity[]> {
        return this.tagGroupService.findAll();
    }

    @ApiResponse({status: 200, type: TagGroupEntity, description: 'Returns Tag Group'})
    @Get(':id')
    @UseGuards(AuthGuard('bearer'))
    public findOne(@Param('id') id: string, @Query() query): Promise<TagGroupEntity> {
        if (query.title) {
            // TODO: Implement proper filters
            return this.tagGroupService.findOneByTitle(query.title);
        }
        return this.tagGroupService.findOne(id);
    }

    @ApiResponse({status: 200, type: TagGroupEntity, description: 'Returns Tag Group'})
    @Delete(':id')
    @UseGuards(AuthGuard('bearer'))
    public delete(@Param('id') id: string): Promise<void> {
        return this.tagGroupService.delete(id);
    }

    @ApiResponse({status: 200, type: TagGroupEntity, description: 'New Tag Group'})
    @Post()
    @UseGuards(AuthGuard('bearer'))
    public create(@Body() group: TagGroupEntity): Promise<TagGroupEntity> {
        return this.tagGroupService.create(group);
    }

    @ApiResponse({status: 200, type: TagGroupEntity, isArray: true, description: 'Filter Tags'})
    @Get('/filter')
    @UseGuards(AuthGuard('bearer'))
    public filter(@Query('filter') filterString: string): Promise<TagGroupEntity[]> {
        return this.tagGroupService.filter(filterString);
    }
}
