import {Module} from "@nestjs/common";
import {TagController} from "./controllers/TagController";
import {Connection} from "typeorm";
import {TagEntity} from "./entities/Tag.entity";
import {RepositoryKeys} from "./RepositoryKeys";
import {TagService} from "./services/TagService";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule
    ],
    controllers: [
        TagController
    ],
    providers: [
        {
            provide: RepositoryKeys.tagRepo,
            useFactory: (connection: Connection) => connection.getRepository(TagEntity),
            inject: [Connection],
        },
        TagService
    ]
})
export class ApiTagsModule {
}
