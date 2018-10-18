import {Module} from "@nestjs/common";
import {StatisticsController} from "./statisctics/controllers/StatisticsController";

@Module({
    imports: [
        StatisticsController,
    ],
    controllers: [],
    exports: [
        StatisticsController
    ]
})
export class SvandisWorkerApiModule {
}
