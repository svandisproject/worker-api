import {Global, Module} from "@nestjs/common";
import {SvandisApiModule} from "./svandis/SvandisApiModule";
import {StatisticsController} from "./controllers/StatisticsController";

@Global()
@Module({
    imports: [
        SvandisApiModule,
    ],
    controllers: [
        StatisticsController
    ],
    exports: [
        SvandisApiModule
    ]
})
export class ApiModule {

}
