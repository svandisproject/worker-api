import {Component} from "@nestjs/common";
import {TaskConfiguration} from "../../../api/svandis/resources/dataModel/TaskConfiguration";
import * as _ from "lodash";
import {Subject} from "rxjs/Subject";
import {setInterval} from "timers";
import Timer = NodeJS.Timer;

@Component()
export class TaskConfigurationService {
    private configurationSubject: Subject<TaskConfiguration> = new Subject<TaskConfiguration>();
    private intervalContainer: Timer[] = [];

    public initConfigurationSubject(configurations: TaskConfiguration[]) {
        if (!_.isEmpty(this.intervalContainer)) {
            return;
        }

        _.each(configurations, (conf) => {
            const interval: Timer =
                setInterval(() => this.configurationSubject.next(conf), conf.time_interval);
            this.intervalContainer.push(interval);
        });
    }

    public destroyIntervals(): void {
        _.each(this.intervalContainer, (interval) => clearInterval(interval));
        this.intervalContainer = [];
    }

    public getConfigurationSubject(): Subject<TaskConfiguration> {
        return this.configurationSubject;
    }
}
