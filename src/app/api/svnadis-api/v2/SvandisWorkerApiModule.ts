import {Module} from "@nestjs/common";
import {ApiStatisticsModule} from "./statisctics/ApiStatisticsModule";
import {ApiTagsModule} from "./tags/ApiTagsModule";
import {HttpStrategy} from "./auth/HttpStrategy";
import {AuthService} from "./auth/AuthService";
import {SvandisKamiApiModule} from "../v1/svandis-kami-api/SvandisKamiApiModule";

@Module({
    imports: [
        SvandisKamiApiModule,
        ApiStatisticsModule,
        ApiTagsModule
    ],
    exports: [
        ApiStatisticsModule,
        ApiTagsModule
    ],
    providers: [
        HttpStrategy,
        AuthService
    ]
})
export class SvandisWorkerApiModule {
}
