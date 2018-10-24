import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {TagGroupEntity} from "../entities/TagGroup.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {FilterStringToQueryStringConverter} from "app/common/typeorm/filter/FilterStringToQueryStringConverter";
import {Pageable, PageRequest} from "../../../../../common/typeorm/pagination/Pageable";
import {PageableFactory} from "../../../../../common/typeorm/pagination/PageableFactory";
import * as _ from "lodash";

@Injectable()
export class TagGroupService {
    constructor(@InjectRepository(TagGroupEntity) private readonly tagGroupRepo: Repository<TagGroupEntity>) {
    }

    async findAll(pageRequest?: PageRequest): Promise<Pageable<TagGroupEntity>> {
        pageRequest = _.merge(PageableFactory.getDefaultPageRequest(), pageRequest);
        const q = this.tagGroupRepo
            .createQueryBuilder('tg')
            .leftJoinAndSelect('tg.tags', 'tag')
            .skip(pageRequest.page * pageRequest.size)
            .take(pageRequest.size);

        if (pageRequest.filter) {
            const queryString = FilterStringToQueryStringConverter.convert(pageRequest.filter, 'tg');
            q.where(queryString);
        }

        return await PageableFactory.build(q.getMany(), pageRequest, q.getCount());
    }

    async create(tagGroup: TagGroupEntity): Promise<TagGroupEntity> {
        const result = await this.tagGroupRepo.query('SELECT MAX(id) FROM tag_group');
        const maxId = result[0].max;
        tagGroup.id = maxId + 1;

        return await this.tagGroupRepo.save(tagGroup);
    }

    async delete(groupId: number): Promise<void> {
        await this.tagGroupRepo.delete(groupId);
    }

    async findOne(groupId: number): Promise<TagGroupEntity> {
        return await this.tagGroupRepo.findOne(groupId, { relations: ['tags'] });
    }

    async findOneByTitle(groupTitle: number): Promise<TagGroupEntity> {
        return await this.tagGroupRepo.findOne({where: {title: groupTitle}});
    }

    async update(groupData: TagGroupEntity): Promise<TagGroupEntity> {
        return await this.tagGroupRepo.save(groupData);
    }
}
