import {Component} from "@nestjs/common";
import {WorkerResource} from "../resources/WorkerResource";
import {Observable} from "rxjs/Observable";
import {WorkerTask} from "../resources/dataModel/WorkerTask";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';

@Component()
export class WorkerService {
    constructor(private workerResource: WorkerResource) {
    }

    getTaskList(): Observable<WorkerTask[]> {
        return this.workerResource.schedule()
            .map((response) => response.data);
    }
}