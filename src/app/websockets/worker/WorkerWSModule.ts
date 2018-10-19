import {Module, OnModuleDestroy, OnModuleInit} from "@nestjs/common";
import {WorkerWSGateway} from "./WorkerWSGateway";
import {TaskConfigurationService} from "./services/TaskConfigurationService";
import {WorkerService} from "../../api/svnadis-api/v1/svandis-kami-api/services/WorkerService";
import {ApiModule} from "../../api/ApiModule";
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/repeat';
import {CassandraClientService} from "./services/CassandraClientService";
import {UrlCacheService} from "./services/UrlCacheService";

@Module({
    imports: [
        ApiModule,
    ],
    providers: [
        WorkerWSGateway,
        CassandraClientService,
        UrlCacheService,
        TaskConfigurationService
    ],
})
export class WorkerWSModule implements OnModuleInit, OnModuleDestroy {
    constructor(private workerService: WorkerService,
                private taskConfigurationService: TaskConfigurationService) {
    }

    onModuleInit(): void {
        this.workerService.listenForTaskConfiguration().subscribe((configs) => {
            this.taskConfigurationService.initConfigurationSubject(configs);
        });
    }

    onModuleDestroy(): void {
        this.taskConfigurationService.destroyIntervals();
    }
}
