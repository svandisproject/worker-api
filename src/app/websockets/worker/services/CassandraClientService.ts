import {Injectable} from "@nestjs/common";
import {auth, Client} from "cassandra-driver";
import PlainTextAuthProvider = auth.PlainTextAuthProvider;

@Injectable()
export class CassandraClientService {
    private client: Client;

    constructor() {
        this.client = new Client({
            contactPoints: ['34.247.192.31', '34.254.25.212', '34.247.150.247'],
            keyspace: 'svandis_url_cache',
            authProvider: new PlainTextAuthProvider('iccassandra', '94bf4145d00513abda0e919175ce9146')
        });
    }

    public getClient(): Client {
        return this.client;
    }
}