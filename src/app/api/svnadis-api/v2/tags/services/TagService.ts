import {Repository} from "typeorm";
import {TagEntity} from "../entities/Tag.entity";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class TagService {
    constructor(@InjectRepository(TagEntity) private readonly tagRepo: Repository<TagEntity>) {
    }

    async findAll(): Promise<TagEntity[]> {
        return await this.tagRepo.find();
    }
}
