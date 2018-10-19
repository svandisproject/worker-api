import {Module} from "@nestjs/common";
import {TagController} from "./controllers/TagController";
import {Connection} from "typeorm";
import {TagEntity} from "./entities/Tag.entity";
import {RepositoryKeys} from "./RepositoryKeys";
import {TagService} from "./services/TagService";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TagGroupEntity} from "./entities/TagGroup.entity";
import {TagGroupService} from "./services/TagGroupService";
import {TagGroupController} from "./controllers/TagGroupController";

@Module({
    imports: [
        TypeOrmModule
    ],
    controllers: [
        TagController,
        TagGroupController
    ],
    providers: [
        {
            provide: RepositoryKeys.tagRepo,
            useFactory: (connection: Connection) => connection.getRepository(TagEntity),
            inject: [Connection],
        },
        {
            provide: RepositoryKeys.tagGroupRepo,
            useFactory: (connection: Connection) => connection.getRepository(TagGroupEntity),
            inject: [Connection],
        },
        TagGroupService,
        TagService
    ]
})
export class ApiTagsModule {
}
