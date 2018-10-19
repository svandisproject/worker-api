import {Module} from '@nestjs/common';
import {WebSocketModule} from "./websockets/WebSocketModule";
import {ApiModule} from "./api/ApiModule";

@Module({
    imports: [
        ApiModule,
        WebSocketModule,
    ],
    exports: [
        ApiModule
    ]
})
export class AppModule {
}
