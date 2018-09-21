import {Injectable} from "@nestjs/common";
import {TaskConfiguration} from "../../../api/svandis/resources/dataModel/TaskConfiguration";
import * as _ from "lodash";
import {Subject} from "rxjs/Subject";
import {setInterval} from "timers";
import Timer = NodeJS.Timer;

@Injectable()
export class TaskConfigurationService {
    public static readonly CONFIG_UPDATE_EVENT: string = 'task-config-update';

    private configurationSubject: Subject<TaskConfiguration[]> = new Subject<TaskConfiguration[]>();
    private intervalContainer: Timer[] = [];
    private currentConfigs: TaskConfiguration[];
    private readonly emitIntervalTime = 20000;

    public initConfigurationSubject(configs: TaskConfiguration[]) {
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

    public getConfigurationSubject(): Subject<TaskConfiguration[]> {
        return this.configurationSubject;
    }

    public canReloadConfigs(configs: TaskConfiguration[]): boolean {
        return !_.isEqual(this.currentConfigs, configs) && this.currentConfigs !== undefined;
    }

    private emitTaskConfigurations(configs: TaskConfiguration[]) {
        this.currentConfigs = configs;
        const interval = setInterval(() => this.configurationSubject.next(configs), this.emitIntervalTime);
        this.intervalContainer.push(interval);
    }
}
