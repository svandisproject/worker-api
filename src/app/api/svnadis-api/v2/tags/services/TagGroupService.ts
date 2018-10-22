import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {TagGroupEntity} from "../entities/TagGroup.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {FilterStringToQueryStringConverter} from "app/common/typeorm/filter/FilterStringToQueryStringConverter";

@Injectable()
export class TagGroupService {
    constructor(@InjectRepository(TagGroupEntity) private readonly tagGroupRepo: Repository<TagGroupEntity>) {
    }

    async findAll(): Promise<TagGroupEntity[]> {
        return await this.tagGroupRepo.find({ relations: ['tags'] });
    }

    async create(tagGroup: TagGroupEntity): Promise<TagGroupEntity> {
        let count = await this.tagGroupRepo.count();
        tagGroup.id = count++;
        return await this.tagGroupRepo.save(tagGroup);
    }

    async delete(groupId: string): Promise<void> {
        await this.tagGroupRepo.delete(groupId);
    }

    async findOne(groupId: string): Promise<TagGroupEntity> {
        return await this.tagGroupRepo.findOne(groupId);
    }

    async findOneByTitle(groupTitle: string): Promise<TagGroupEntity> {
        return await this.tagGroupRepo.findOne({where: {title: groupTitle}});
    }

    async filter(filterString: string): Promise<TagGroupEntity[]> {
        const whereString = FilterStringToQueryStringConverter.convert(filterString);
        const tagGroups = this.tagGroupRepo
            .createQueryBuilder('t')
            .select()
            .where(whereString)
            .getMany();

        return await tagGroups;
    }
}
