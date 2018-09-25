import {WorkerResource} from "../resources/WorkerResource";
import {Observable} from "rxjs/Observable";
import {TaskConfiguration} from "../resources/dataModel/TaskConfiguration";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/interval';
import {Injectable} from "@nestjs/common";
import {map, switchMap} from "rxjs/internal/operators";

@Injectable()
export class WorkerService {
    private readonly POLLING_INTERVAL: number = 60000;

    constructor(private workerResource: WorkerResource) {
    }

    listenForTaskConfiguration(): Observable<TaskConfiguration[]> {
        const pollingInterval: Observable<number> = Observable.interval(this.POLLING_INTERVAL);

        return pollingInterval.pipe(
            switchMap(() => this.workerResource.schedule()
                .pipe(
                    map((response) => response.data.filter((config) => config.type === 'web'))
                )
            ));
    }
}
