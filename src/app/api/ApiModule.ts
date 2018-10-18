import {Global, Module} from "@nestjs/common";
import {SvandisKamiApiModule} from "./svnadis-api/v1/svandis-kami-api/SvandisKamiApiModule";
import {StatisticsController} from "./svnadis-api/v2/statisctics/controllers/StatisticsController";
import {SvandisWorkerApiModule} from "./svnadis-api/v2/SvandisWorkerApiModule";

@Global()
@Module({
    imports: [
        SvandisKamiApiModule,
        SvandisWorkerApiModule
    ],
    controllers: [
        StatisticsController
    ],
    exports: [
        SvandisKamiApiModule,
        SvandisWorkerApiModule
    ]
})
export class ApiModule {

}
