import {SubscribeMessage, WebSocketGateway, WsResponse} from "@nestjs/websockets";

@WebSocketGateway(3333)
export class WorkerWebSocketComponent {
    constructor() {
    }

    @SubscribeMessage('worker-list')
    onEvent(client, data): WsResponse<any> {
        return {event: 'worker-list', data: 'hi'};
    }
}