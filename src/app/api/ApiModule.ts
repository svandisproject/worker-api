import {Global, Module} from "@nestjs/common";
import {SvandisKamiApiModule} from "./svnadis-api/v1/svandis-kami-api/SvandisKamiApiModule";
import {StatisticsController} from "./svnadis-api/v2/statisctics/controllers/StatisticsController";
import {SvandisWorkerApiModule} from "./svnadis-api/v2/SvandisWorkerApiModule";
import {TypeOrmModule} from "@nestjs/typeorm";

@Global()
@Module({
    imports: [
        SvandisKamiApiModule,
        SvandisWorkerApiModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.PG_CONNECTION_URL || '',
            ssl: true,
            logging: ["error"],
            entities: ['src/**/**.entity{.ts,.js}']
        })
    ],
    controllers: [
        StatisticsController
    ],
    exports: [
        SvandisKamiApiModule,
        SvandisWorkerApiModule
    ]
})
export class ApiModule {

}
