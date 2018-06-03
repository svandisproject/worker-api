import {Injectable, Logger} from "@nestjs/common";
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
        Logger.log('Init...' + this.canReloadConfigs(configs))
        if (this.canReloadConfigs(configs)) {
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

    public canReloadConfigs(configs: TaskConfiguration[]): boolean {
        return !_.isEqual(this.currentConfigs, configs) && this.currentConfigs !== undefined;
    }

    private emitTaskConfigurations(configs: TaskConfiguration[]) {
        this.currentConfigs = configs;
        _.forEach(configs, (conf, index) => {
            const interval: Timer =
                setInterval(() => {
                        if (index === configs.length - 1) {
                            this.configurationSubject.next(conf);
                            this.configurationSubject.complete();
                        } else {
                            this.configurationSubject.next(conf);
                        }
                    }, conf.time_interval
                );
            this.intervalContainer.push(interval);
        });
    }
}
