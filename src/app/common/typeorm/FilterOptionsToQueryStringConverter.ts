import { FilterOption } from "./FilterOption";


export class FilterOptionsToQueryStringConverter {
    public static convert(filterOptions: FilterOption[]): string {
        const operationsMap = {
            'eq': '=',
            'gt': '>',
            'lt': '<',
            'lk': 'LIKE',
            'in': 'IN'
        };

        let queryOptions = filterOptions.map(option => {
            return `${option.property} ${operationsMap[option.type]} ${option.value}`;
        });

        return queryOptions.join(' and ');
    }
}