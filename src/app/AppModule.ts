import {Module} from '@nestjs/common';
import {WebSocketModule} from "./websockets/WebSocketModule";
import {ApiModule} from "./api/ApiModule";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [
        ApiModule,
        WebSocketModule,
        TypeOrmModule.forRoot()
    ],
    exports: [
        ApiModule
    ]
})
export class AppModule {
}