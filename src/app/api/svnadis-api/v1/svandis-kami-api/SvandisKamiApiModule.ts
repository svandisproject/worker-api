import {Module} from "@nestjs/common";
import {WorkerResource} from "./resources/WorkerResource";
import {HttpModule} from "@nestjs/common/http";
import {WorkerService} from "./services/WorkerService";
import {PostResource} from "./resources/PostResource";

@Module({
    imports: [
        HttpModule
    ],
    providers: [
        PostResource,
        WorkerResource,
        WorkerService
    ],
    exports: [
        WorkerResource,
        PostResource,
        WorkerService
    ]
})
export class SvandisKamiApiModule {
}
