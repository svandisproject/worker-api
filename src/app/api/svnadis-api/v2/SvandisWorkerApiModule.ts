import {Module} from "@nestjs/common";
import {ApiStatisticsModule} from "./statisctics/ApiStatisticsModule";
import {ApiTagsModule} from "./tags/ApiTagsModule";

@Module({
    imports: [
        ApiStatisticsModule,
        ApiTagsModule
    ],
    exports: [
        ApiStatisticsModule,
        ApiTagsModule
    ]
})
export class SvandisWorkerApiModule {
}
