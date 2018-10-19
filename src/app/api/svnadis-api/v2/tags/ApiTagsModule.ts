import {Module} from "@nestjs/common";
import {TagController} from "./controllers/TagController";
import {TagEntity} from "./entities/Tag.entity";
import {TagService} from "./services/TagService";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TagGroupEntity} from "./entities/TagGroup.entity";
import {TagGroupService} from "./services/TagGroupService";
import {TagGroupController} from "./controllers/TagGroupController";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TagGroupEntity,
            TagEntity
        ])
    ],
    controllers: [
        TagController,
        TagGroupController
    ],
    providers: [
        TagGroupService,
        TagService
    ]
})
export class ApiTagsModule {
}
