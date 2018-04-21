import {Component} from "@nestjs/common";
import {TaskConfiguration} from "../../../api/svandis/resources/dataModel/TaskConfiguration";
import * as _ from "lodash";
import {Subject} from "rxjs/Subject";
import {setInterval} from "timers";
import Timer = NodeJS.Timer;

@Component()
export class TaskConfigurationService {
    public static readonly CONFIG_UPDATE_EVENT: string = 'task-config-update';

    private configurationSubject: Subject<TaskConfiguration> = new Subject<TaskConfiguration>();
    private intervalContainer: Timer[] = [];
    private currentConfigs: TaskConfiguration[];

    public initConfigurationSubject(configs: TaskConfiguration[]) {
        if (this.canReload(configs)) {
            this.currentConfigs = configs;
            this.reloadConfigurationSubject(configs);
            return;
        }

        _.each(configs, (conf) => {
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

    private reloadConfigurationSubject(config: TaskConfiguration[]): void {
        this.destroyIntervals();
        this.initConfigurationSubject(config);
    }

    private canReload(configs: TaskConfiguration[]): boolean {
        return !_.isEqual(this.currentConfigs, configs);
    }
}
