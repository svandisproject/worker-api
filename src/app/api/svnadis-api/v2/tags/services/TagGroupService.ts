import {Repository} from "typeorm";
import {Inject, Injectable} from "@nestjs/common";
import {RepositoryKeys} from "../RepositoryKeys";
import {TagGroupEntity} from "../entities/TagGroup.entity";

@Injectable()
export class TagGroupService {
    constructor(@Inject(RepositoryKeys.tagGroupRepo) private readonly tagGroupRepo: Repository<TagGroupEntity>) {
    }

    async findAll(): Promise<TagGroupEntity[]> {
        return await this.tagGroupRepo.find();
    }
}
