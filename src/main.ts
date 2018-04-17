import {NestFactory} from '@nestjs/core';
import {AppModule} from './AppModule';
import {AppConfig} from "./config/AppConfig";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(AppConfig.APP_PORT);
}

bootstrap();
