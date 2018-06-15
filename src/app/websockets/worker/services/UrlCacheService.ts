import {Injectable} from "@nestjs/common";
import {CassandraAdapter} from "../../../common/cassandra/CassandraAdapter";
import {CassandraClientService} from "./CassandraClientService";
import {filter, mergeMap} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";
import md5 = require("md5");

@Injectable()
export class UrlCacheService extends CassandraAdapter {
    constructor(protected cassandraService: CassandraClientService) {
        super();
    }

    public getValidatedUrls(urls: string[], baseUrl: string): any {
        return of(urls).pipe(
            filter((url: string) => url !== baseUrl),
            mergeMap((url: string) => {
                return this.findByUrl(url)
                    .then((res: UrlCacheItem) => {
                        return {urls: res.hash ? '' : url};
                    });
            })
        );
    }

    public findByUrl(url: string): Promise<UrlCacheItem> {
        const query = 'SELECT * FROM crawled_urls WHERE hash = ?';
        return this.cassandraService.getClient()
            .execute(query, [md5(url)], {prepare: true})
            .then((res) => {
                const cacheItem = res.first() as UrlCacheItem;
                return cacheItem || {url: url};
            });
    }
}

export interface UrlCacheItem {
    id?: string;
    url?: string;
    confirmation?: string;
    hash?: string;
}

export interface ValidatedUrls {
    urls: string[];
}
