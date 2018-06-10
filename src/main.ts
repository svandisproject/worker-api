import {NestFactory} from '@nestjs/core';
import {AppModule} from './app/AppModule';
import {AppConfig} from "./config/AppConfig";
import {Logger} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(AppConfig.APP_PORT);
    Logger.log("Listening on port: " + AppConfig.APP_PORT)
}

bootstrap();
