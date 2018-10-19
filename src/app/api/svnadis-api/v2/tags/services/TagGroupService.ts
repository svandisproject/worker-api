import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {TagGroupEntity} from "../entities/TagGroup.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class TagGroupService {
    constructor(@InjectRepository(TagGroupEntity) private readonly tagGroupRepo: Repository<TagGroupEntity>) {
    }

    async findAll(): Promise<TagGroupEntity[]> {
        return await this.tagGroupRepo.find();
    }

    async create(tagGroup: TagGroupEntity): Promise<TagGroupEntity> {
        let count = await this.tagGroupRepo.count();
        tagGroup.id = count++;
        return await this.tagGroupRepo.save(tagGroup);
    }

    async findOne(groupId: string): Promise<TagGroupEntity> {
        return await this.tagGroupRepo.findOne(groupId);
    }
}
