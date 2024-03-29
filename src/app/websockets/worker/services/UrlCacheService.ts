import {Injectable} from "@nestjs/common";
import {CassandraAdapter} from "../../../common/cassandra/CassandraAdapter";
import {CassandraClientService} from "./CassandraClientService";
import {filter} from "rxjs/operators";
import {Observable} from "rxjs/Rx";
import md5 = require("md5");

@Injectable()
export class UrlCacheService extends CassandraAdapter {
    constructor(protected cassandraService: CassandraClientService) {
        super();
    }

    public getValidatedUrls(urls: string[], baseUrl: string): any {
        return Observable.create((observer) => {
            const notConfirmedUrls: string[] = [];

            urls.forEach((url, index) => {
                this.findByUrl(url).then((res) => {
                    if (res.confirmations < 10) {
                        notConfirmedUrls.push(res.url);
                    }

                    if (index === urls.length - 1) {
                        observer.next({urls: notConfirmedUrls});
                        observer.complete();
                    }
                });
            });
        }).pipe(filter((url: string) => url !== baseUrl));

    }

    public findByUrl(url: string): Promise<UrlCacheItem> {
        const query = 'SELECT * FROM crawled_urls WHERE hash = ?';
        return this.cassandraService.getClient()
            .execute(query, [md5(url)], {prepare: true})
            .then((res) => {
                const cacheItem = res.first() as UrlCacheItem;
                return cacheItem || {url: url, confirmations: 0};
            });
    }
}

export interface UrlCacheItem {
    id?: string;
    url?: string;
    confirmations?: number;
    hash?: string;
}

export interface ValidatedUrls {
    urls: string[];
}
