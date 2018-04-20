import {SubscribeMessage, WebSocketGateway, WsResponse} from "@nestjs/websockets";
import {WorkerResource} from "../../api/svandis/resources/WorkerResource";

@WebSocketGateway(3333)
export class WorkerWSGateway {
    constructor(res: WorkerResource) {
    }

    @SubscribeMessage('worker-list')
    onEvent(client, data): WsResponse<any> {

        return {event: 'worker-list', data: 'hi'};
    }
}
