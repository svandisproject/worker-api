import {Repository} from "typeorm";
import {TagEntity} from "../entities/Tag.entity";
import {Inject, Injectable} from "@nestjs/common";
import {RepositoryKeys} from "../RepositoryKeys";

@Injectable()
export class TagService {
    constructor(@Inject(RepositoryKeys.tagRepo) private readonly tagRepo: Repository<TagEntity>) {
    }

    async findAll(): Promise<TagEntity[]> {
        return await this.tagRepo.find();
    }
}
