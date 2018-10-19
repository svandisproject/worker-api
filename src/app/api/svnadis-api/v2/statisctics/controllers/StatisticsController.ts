import {Controller, Get, Injectable, Req, Res} from "@nestjs/common";
import {InjectConnection} from "@nestjs/typeorm";
import {Connection} from 'typeorm';
import {decode} from 'jsonwebtoken';
import {Post} from "../dataModel/Post";
import {ApiResponse, ApiUseTags} from "@nestjs/swagger";

@Injectable()
@ApiUseTags('statistics')
@Controller('statistics')
export class StatisticsController {
    constructor(@InjectConnection() private readonly connection: Connection) {
    }

    @ApiResponse({status: 200, type: Post, isArray: true, description: 'Returns Posts'})
    @Get()
    findAll(@Req() request, @Res() response): Post[] {
        if (!request.headers.authorization) {
            return [];
        }
        const jwtToken = request.headers.authorization.split(' ')[1];
        const userData = decode(jwtToken);
        const rawSql = this.getRawCrawledPostsSQLForEmail(userData.username);

        this.connection.query(rawSql).then((posts) => {
            response.json(posts);
        }).catch((err) => {
            console.error(err);
            response.json([]);
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
