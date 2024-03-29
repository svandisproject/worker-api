import {OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Client, Server} from "socket.io";
import {TaskConfigurationService} from "./services/TaskConfigurationService";
import {Subscription} from "rxjs/Subscription";
import {Logger} from "@nestjs/common";
import {UrlCacheService, ValidatedUrls} from "./services/UrlCacheService";
import {map} from "rxjs/operators";
import {Observable} from "rxjs/Rx";
import * as _ from 'lodash';

@WebSocketGateway()
export class WorkerWSGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() private server: Server;
    private clientSubscriptionMap: Map<string, Subscription> = new Map<string, Subscription>();

    constructor(private taskConfigService: TaskConfigurationService,
                private urlCache: UrlCacheService) {
    }

    @SubscribeMessage('validate')
    onEvent(client, data: { urls: string[], baseUrl: string }): Observable<ValidateResponse> {
        const event = 'validate-complete';
        Logger.log('Urls received for validation');
        return this.urlCache.getValidatedUrls(data.urls, data.baseUrl)
            .pipe(
                map((res) => {
                    console.log('not confirmed urls :', res);
                    return {event: event, data: res};
                })
            );
    }

    public handleConnection(client: Client): any {
        this.subscribeClient(client);
    }

    public handleDisconnect(client: Client): any {
        this.unsubscribeClient(client);
    }

    private subscribeClient(client: Client) {
        const subscription: Subscription = this.taskConfigService.getConfigurationSubject()
            .subscribe((configs) => {
                Logger.log('Configs received, emitting');

                this.server.emit(TaskConfigurationService.CONFIG_UPDATE_EVENT, _.sampleSize(configs, 1));
            });

        this.clientSubscriptionMap.set(client.id, subscription);
    }

    private unsubscribeClient(client: Client) {
        const clientSubscription: Subscription = this.clientSubscriptionMap.get(client.id);

        if (clientSubscription) {
            clientSubscription.unsubscribe();
            this.clientSubscriptionMap.delete(client.id);
        }
    }
}

export interface ValidateResponse {
    event: string;
    data: ValidatedUrls;
}