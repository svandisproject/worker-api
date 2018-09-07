import {Controller, Get, Req, Injectable} from "@nestjs/common";
import {InjectConnection} from "@nestjs/typeorm";
import {Connection} from 'typeorm';
import {decode} from 'jsonwebtoken';

@Injectable()
@Controller('statistics')
export class StatisticsController {
    constructor(@InjectConnection() private readonly connection: Connection) {
    }

    @Get()
    findAll(@Req() request): object[] {
        if (!request.headers.authorization) {
            return [];
        }
        const jwtToken = request.headers.authorization.split(' ')[1];
        const userData = decode(jwtToken);
        const rawSql = this.getRawCrawledPostsSQLForEmail(userData.username);

        this.connection.query(rawSql).then(posts => {
            return posts;
        }).catch(err => {
            console.error(err);
            return [];
        });
    }

    private getRawCrawledPostsSQLForEmail(email): string {
        return `
            select p.id, p.title, p.url
            from post p
            left join worker w on w.id = p.created_by
            left join "user" u on u.id = w.user_id
            where u.email = '${email}'
        `;
    }
}
