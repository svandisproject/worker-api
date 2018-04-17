import {BadRequestException, Component} from "@nestjs/common";
import {WorkerResource} from "../resources/WorkerResource";
import {Observable} from "rxjs/Observable";
import {ScheduledWorker} from "../resources/dataModel/ScheduledWorker";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';

@Component()
export class WorkerService {
    constructor(private workerResource: WorkerResource) {
    }

    getScheduledWorkers(): Observable<ScheduledWorker[]> {
        return this.workerResource.schedule()
            .map((response) => response.data);
    }
}