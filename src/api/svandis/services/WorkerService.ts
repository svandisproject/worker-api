import {Component} from "@nestjs/common";
import {WorkerResource} from "../resources/WorkerResource";
import {Observable} from "rxjs/Observable";
import {TaskConfiguration} from "../resources/dataModel/TaskConfiguration";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';

@Component()
export class WorkerService {
    constructor(private workerResource: WorkerResource) {
    }

    getTaskConfigurations(): Observable<TaskConfiguration[]> {
        return this.workerResource.schedule()
            .map((response) => response.data);
    }
}
