import {OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Client, Server} from "socket.io";
import {TaskConfigurationService} from "./services/TaskConfigurationService";
import {Subscription} from "rxjs/Subscription";
import * as _ from "lodash";

@WebSocketGateway(3333)
export class WorkerWSGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() private server: Server;
    private clientSubscriptionMap: { [id: string]: Subscription } = {};

    constructor(private taskConfigService: TaskConfigurationService) {
    }

    public handleConnection(client: Client): any {
        this.subscribeClient(client);
    }

    public handleDisconnect(client: Client): any {
        this.unsubscribeClient(client);
    }

    private subscribeClient(client: Client) {
        this.clientSubscriptionMap[client.id] = this.taskConfigService.getConfigurationSubject()
            .subscribe((config) => {
                this.server.emit(TaskConfigurationService.CONFIG_UPDATE_EVENT, config);
            });
    }

    private unsubscribeClient(client: Client) {
        const clientSubscription: Subscription = _.get(this.clientSubscriptionMap, client.id);

        if (clientSubscription) {
            clientSubscription.unsubscribe();
        }
    }
}
