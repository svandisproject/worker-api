import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {INestApplication} from "@nestjs/common";

export class SwaggerFactory {
    public static build(app: INestApplication, options?: any) {
        options = options || new DocumentBuilder()
            .setTitle('Svandis Worker Api')
            .setDescription('')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup('api', app, document);
    }
}