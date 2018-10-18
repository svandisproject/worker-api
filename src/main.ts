import {NestFactory} from '@nestjs/core';
import {AppModule} from './app/AppModule';
import {AppConfig} from "./config/AppConfig";
import {Logger} from "@nestjs/common";
import {SwaggerFactory} from "./app/api/svnadis-api/v2/swagger/SwaggerFactory";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    SwaggerFactory.build(app);

    await app.listen(AppConfig.APP_PORT);
    Logger.log("Listening on port: " + AppConfig.APP_PORT);
}

bootstrap();
