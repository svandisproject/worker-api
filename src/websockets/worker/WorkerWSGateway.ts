import {OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Client, Server} from "socket.io";
import {TaskConfigurationService} from "./services/TaskConfigurationService";
import {Subscription} from "rxjs/Subscription";
import {Logger} from "@nestjs/common";

@WebSocketGateway()
export class WorkerWSGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() private server: Server;
    private clientSubscriptionMap: Map<string, Subscription> = new Map<string, Subscription>();

    constructor(private taskConfigService: TaskConfigurationService) {
    }

    public handleConnection(client: Client): any {
        this.subscribeClient(client);
    }

    public handleDisconnect(client: Client): any {
        this.unsubscribeClient(client);
    }

    private subscribeClient(client: Client) {
        // TODO: Add repeatWhen
        const subscription: Subscription = this.taskConfigService.getConfigurationSubject()
            .subscribe((config) => {
                Logger.log('Config received, emitting');
                this.server.emit(TaskConfigurationService.CONFIG_UPDATE_EVENT, config);
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
