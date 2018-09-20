import {Injectable} from "@nestjs/common";
import {auth, Client} from "cassandra-driver";
import PlainTextAuthProvider = auth.PlainTextAuthProvider;

@Injectable()
export class CassandraClientService {
    private client: Client;

    constructor() {
        this.client = new Client({
            contactPoints: ['34.253.68.126', '18.202.139.34', '18.202.128.219'],
            keyspace: 'svandis_url_cache',
            authProvider: new PlainTextAuthProvider('iccassandra', 'f8fdf1c9d5af30af42a6cb8eca3e9e40')
        });
    }

    public getClient(): Client {
        return this.client;
    }
}