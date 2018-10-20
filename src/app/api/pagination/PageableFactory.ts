import {Pageable, PageRequest} from "./Pageable";

export class PageableFactory {
    static async build<T>(collection: Promise<T[]>, pageRequest: PageRequest, total: Promise<number>): Promise<Pageable<T>> {
        return {
            content: await collection,
            total: await total,
            page_request: pageRequest
        };
    }

    static getDefaultPageRequest(): PageRequest {
        return {
            page: 0,
            size: 10
        };
    }
}
