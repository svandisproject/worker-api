import {Injectable} from "@nestjs/common";
import {Client} from "@nestjs/microservices";
import {Transport} from "@nestjs/common/enums/transport.enum";
import {ClientRedis} from "@nestjs/microservices/client/client-redis";
import {RedisClient} from "@nestjs/microservices/external/redis.interface";
import {Subject} from "rxjs/Rx";

@Injectable()
export class RedisClientService {
    @Client({
        transport: Transport.REDIS,
        options: {
            url: ''
        }
    })
    private redisClientProxy: ClientRedis;
    private client: RedisClient;

    public getClient(): RedisClient {
        if (!this.client) {
            this.client = this.redisClientProxy.createClient(new Subject<Error>());
        }
        return this.client;
    }
}
