export class Pageable<T> {
    content: T[];
    total: number;
    page_request: PageRequest;
}

export interface PageRequest {
    page?: number;
    size?: number;
    filter?: string;
}
