import {Module} from "@nestjs/common";
import {StatisticsController} from "./controllers/StatisticsController";

@Module({
    controllers: [
        StatisticsController
    ]
})
export class ApiStatisticsModule {
}
