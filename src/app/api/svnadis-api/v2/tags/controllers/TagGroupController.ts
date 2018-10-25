import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from "@nestjs/common";
import {TagGroupService} from "../services/TagGroupService";
import {ApiResponse, ApiUseTags} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";
import {TagGroupEntity} from "../entities/TagGroup.entity";
import {Pageable, PageRequest} from "../../../../../common/typeorm/pagination/Pageable";
import {NotFoundException} from "@nestjs/common";

@ApiUseTags('tag-group')
@Controller('tag-group')
@UseGuards(AuthGuard('bearer'))
export class TagGroupController {
    constructor(private tagGroupService: TagGroupService) {
    }

    @ApiResponse({status: 200, type: TagGroupEntity, isArray: true, description: 'Returns all Tag groups'})
    @Get()
    public findAll(@Query() query: PageRequest): Promise<Pageable<TagGroupEntity>> {
        return this.tagGroupService.findAll(query);
    }

    @ApiResponse({status: 200, type: TagGroupEntity, description: 'Returns Tag Group'})
    @Get(':id')
    public findOne(@Param('id') id: number): Promise<TagGroupEntity> {
        return this.tagGroupService.findOne(id);
    }

    @ApiResponse({status: 200, type: TagGroupEntity, description: 'Returns Tag Group'})
    @Delete(':id')
    public delete(@Param('id') id: number): Promise<void> {
        return this.tagGroupService.delete(id);
    }

    @ApiResponse({status: 200, type: TagGroupEntity, description: 'New Tag Group'})
    @Post()
    async create(@Body() newGroup: TagGroupEntity): Promise<TagGroupEntity> {
        const createdGroup = await this.tagGroupService.create(newGroup);
        return this.tagGroupService.findOne(createdGroup.id);
    }

    @ApiResponse({status: 200, type: TagGroupEntity, isArray: true, description: 'Returns all Tag groups'})
    @Put(':id')
    async update(@Param('id') id: number, @Body() updatedTagGroup: TagGroupEntity): Promise<TagGroupEntity> {
        const tagGroup = await this.tagGroupService.findOne(id);

        if (!tagGroup) {
            throw new NotFoundException();
        }

        tagGroup.title = updatedTagGroup.title || tagGroup.title;
        tagGroup.enabled = updatedTagGroup.enabled || tagGroup.enabled;
        tagGroup.tags = updatedTagGroup.tags || tagGroup.tags;

        return this.tagGroupService.update(tagGroup);
    }
}
