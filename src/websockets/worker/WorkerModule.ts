import {Module} from "@nestjs/common";
import {WorkerWebSocketComponent} from "./WorkerWebSocketComponent";

@Module({
    components: [WorkerWebSocketComponent]
})
export class WorkerModule {
}