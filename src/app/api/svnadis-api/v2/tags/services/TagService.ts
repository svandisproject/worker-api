import {Repository} from "typeorm";
import {TagEntity} from "../entities/Tag.entity";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Pageable, PageRequest} from "../../../../../common/typeorm/pagination/Pageable";
import {PageableFactory} from "../../../../../common/typeorm/pagination/PageableFactory";
import * as _ from "lodash";
import {FilterStringToQueryStringConverter} from "app/common/typeorm/filter/FilterStringToQueryStringConverter";

@Injectable()
export class TagService {
    constructor(@InjectRepository(TagEntity) private readonly tagRepo: Repository<TagEntity>) {
    }

    // TODO: Create a pipe for pageable
    async findAll(pageRequest?: PageRequest): Promise<Pageable<TagEntity>> {
        pageRequest = _.merge(PageableFactory.getDefaultPageRequest(), pageRequest);
        const q = this.tagRepo
            .createQueryBuilder('t')
            .skip(pageRequest.page * pageRequest.size)
            .take(pageRequest.size);

        if (pageRequest.filter) {
            const queryString = FilterStringToQueryStringConverter.convert(pageRequest.filter);
            q.where(queryString);
        }

        return await PageableFactory.build(q.getMany(), pageRequest, q.getCount());
    }

    async filter(filterString: string): Promise<TagEntity[]> {
        const whereString = FilterStringToQueryStringConverter.convert(filterString);
        const tags = this.tagRepo
            .createQueryBuilder('t')
            .select()
            .where(whereString)
            .getMany();

        return await tags;
    }
}
