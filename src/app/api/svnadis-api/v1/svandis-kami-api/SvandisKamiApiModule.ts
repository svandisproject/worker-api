import {Module} from "@nestjs/common";
import {WorkerResource} from "./resources/WorkerResource";
import {HttpModule} from "@nestjs/common/http";
import {WorkerService} from "./services/WorkerService";

@Module({
    imports: [
        HttpModule
    ],
    providers: [
        WorkerResource,
        WorkerService
    ],
    exports: [
        WorkerResource,
        WorkerService
    ]
})
export class SvandisKamiApiModule {
}
