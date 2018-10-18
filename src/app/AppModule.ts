import {Module} from '@nestjs/common';
import {WebSocketModule} from "./websockets/WebSocketModule";
import {ApiModule} from "./api/ApiModule";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [
        ApiModule,
        WebSocketModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.PG_CONNECTION_URL || '',
            ssl: true,
            entities: ['src/**/**.entity{.ts,.js}']
        })
    ],
    exports: [
        ApiModule
    ]
})
export class AppModule {
}