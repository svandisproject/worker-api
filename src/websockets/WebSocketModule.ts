import {Module} from "@nestjs/common";
import {WorkerModule} from "./worker/WorkerModule";
import {ApiModule} from "../api/ApiModule";

@Module({
    imports: [
        ApiModule,
        WorkerModule
    ]
})
export class WebSocketModule {
}