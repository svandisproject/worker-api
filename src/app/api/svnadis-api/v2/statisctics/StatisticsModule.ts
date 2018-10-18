import {Module} from "@nestjs/common";
import {StatisticsController} from "./controllers/StatisticsController";

@Module({
    controllers: [
        StatisticsController
    ],
    exports: [
        StatisticsController
    ]
})
export class StatisticsModule {
}
