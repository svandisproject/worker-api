import {Injectable} from "@nestjs/common";
import {TaskConfiguration} from "../../../api/svandis/resources/dataModel/TaskConfiguration";
import * as _ from "lodash";
import {Subject} from "rxjs/Subject";
import {setInterval} from "timers";
import Timer = NodeJS.Timer;

@Injectable()
export class TaskConfigurationService {
    public static readonly CONFIG_UPDATE_EVENT: string = 'task-config-update';

    private configurationSubject: Subject<TaskConfiguration> = new Subject<TaskConfiguration>();
    private intervalContainer: Timer[] = [];
    private currentConfigs: TaskConfiguration[];

    public initConfigurationSubject(configs: TaskConfiguration[]) {
        if (this.canReload(configs)) {
            this.destroyIntervals();
            this.emitTaskConfigurations(configs);
        } else if (this.currentConfigs === undefined) {
            this.emitTaskConfigurations(configs);
        }
    }

    public destroyIntervals(): void {
        _.each(this.intervalContainer, (interval) => clearInterval(interval));
        this.intervalContainer = [];
    }

    public getConfigurationSubject(): Subject<TaskConfiguration> {
        return this.configurationSubject;
    }

    private emitTaskConfigurations(configs: TaskConfiguration[]) {
        this.currentConfigs = configs;

        _.each(configs, (conf) => {
            const interval: Timer =
                setInterval(() => this.configurationSubject.next(conf), conf.time_interval);
            this.intervalContainer.push(interval);
        });
    }

    private canReload(configs: TaskConfiguration[]): boolean {
        return !_.isEqual(this.currentConfigs, configs) && this.currentConfigs !== undefined;
    }
}
