import {Module} from "@nestjs/common";
import {WorkerWSModule} from "./worker/WorkerWSModule";

@Module({
    imports: [
        WorkerWSModule
    ]
})
export class WebSocketModule {

}
