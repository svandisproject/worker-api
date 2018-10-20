import {Repository} from "typeorm";
import {TagEntity} from "../entities/Tag.entity";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Pageable, PageRequest} from "../../../../pagination/Pageable";
import {PageableFactory} from "../../../../pagination/PageableFactory";
import * as _ from "lodash";
import { FilterOption } from "app/common/typeorm/FilterOption";
import { FilterStringToQueryStringConverter } from "app/common/typeorm/FilterStringToQueryStringConverter";


@Injectable()
export class TagService {
    constructor(@InjectRepository(TagEntity) private readonly tagRepo: Repository<TagEntity>) {
    }

    // TODO: Create a pipe for pageable
    async findAll(pageRequest?: PageRequest): Promise<Pageable<TagEntity>> {
        pageRequest = _.merge(PageableFactory.getDefaultPageRequest(), pageRequest);
        const q = this.tagRepo
            .createQueryBuilder('t')
            .select()
            .skip(pageRequest.page * pageRequest.size)
            .take(pageRequest.size);

        return await PageableFactory.build(q.getMany(), pageRequest, q.getCount());
    }

    async filter(filterString: string): Promise<TagEntity[]> {
        const whereString = FilterStringToQueryStringConverter.convert(filterString);
        console.log(whereString);
        const tags = this.tagRepo
            .createQueryBuilder('t')
            .select()
            .where(whereString)
            .getMany();

        return await tags;
    }
}
