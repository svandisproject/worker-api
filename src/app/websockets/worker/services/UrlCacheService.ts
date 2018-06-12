import {Injectable} from "@nestjs/common";
import {CassandraAdapter} from "../../../common/cassandra/CassandraAdapter";
import {CassandraClientService} from "./CassandraClientService";
import md5 = require("md5");

@Injectable()
export class UrlCacheService extends CassandraAdapter {
    constructor(protected cassandraService: CassandraClientService) {
        super();
    }

    public findByUrl(url: string): Promise<UrlCacheItem> {
        const query = 'SELECT * FROM crawled_urls WHERE hash = ?';
        return this.cassandraService.getClient()
            .execute(query, [md5(url)], {prepare: true})
            .then((res) => res.first() as UrlCacheItem);
    }
}

export interface UrlCacheItem {
    id?: string;
    url?: string;
    confirmation?: string;
}
