import {Module, OnModuleDestroy, OnModuleInit} from "@nestjs/common";
import {WorkerWSGateway} from "./WorkerWSGateway";
import {TaskConfigurationService} from "./services/TaskConfigurationService";
import {WorkerService} from "../../api/svandis/services/WorkerService";
import {ApiModule} from "../../api/ApiModule";
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/repeat';

@Module({
    imports: [
        ApiModule,
    ],
    providers: [
        WorkerWSGateway,
        TaskConfigurationService
    ],
})
export class WorkerWSModule implements OnModuleInit, OnModuleDestroy {

    // @Client({
    //     transport: Transport.TCP,
    //     options: {
    //         host: 'localhost',
    //         port: 7777
    //     }
    // })
    // private redisClient: ClientRedis;

    constructor(private workerService: WorkerService,
                private taskConfigurationService: TaskConfigurationService) {

    }

    onModuleInit(): void {
        // this.redisClient.connect()
        //     .then(() => console.log('connected'))
        //     .catch((err) => console.log(err));
        this.workerService.listenForTaskConfiguration().subscribe((configs) => {
            this.taskConfigurationService.initConfigurationSubject(configs);
        });
    }

    onModuleDestroy(): void {
        this.taskConfigurationService.destroyIntervals();
    }
}
