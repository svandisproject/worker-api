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
    public findOne(@Param('id') id: number, @Query() query): Promise<TagGroupEntity> {
        if (query.title) {
            // TODO: Implement proper filters
            return this.tagGroupService.findOneByTitle(query.title);
        }
        return this.tagGroupService.findOne(id);
    }

    @ApiResponse({status: 200, type: TagGroupEntity, description: 'Returns Tag Group'})
    @Delete(':id')
    public delete(@Param('id') id: number): Promise<void> {
        return this.tagGroupService.delete(id);
    }

    @ApiResponse({status: 200, type: TagGroupEntity, description: 'New Tag Group'})
    @Post()
    public create(@Body() group: TagGroupEntity): Promise<TagGroupEntity> {
        return this.tagGroupService.create(group);
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
