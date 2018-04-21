import {Module, OnModuleDestroy, OnModuleInit} from "@nestjs/common";
import {WorkerWSGateway} from "./WorkerWSGateway";
import {TaskConfigurationService} from "./services/TaskConfigurationService";
import {WorkerService} from "../../api/svandis/services/WorkerService";
import {ApiModule} from "../../api/ApiModule";
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/repeat';

@Module({
    imports: [
        ApiModule
    ],
    components: [
        WorkerWSGateway,
        TaskConfigurationService
    ],
})
export class WorkerWSModule implements OnModuleInit, OnModuleDestroy {
    private readonly REPEAT_DELAY: number = 4000;

    constructor(private workerService: WorkerService,
                private taskConfigurationService: TaskConfigurationService) {
    }

    onModuleInit(): void {
        this.workerService.getTaskConfigurations()
            .do((configs) => {
                console.dir(configs, {depth: null, colors: true});
                this.taskConfigurationService.initConfigurationSubject(configs);
            })
            .delay(this.REPEAT_DELAY)
            .repeat()
            .subscribe();
    }

    onModuleDestroy(): void {
        this.taskConfigurationService.destroyIntervals();
    }
}
