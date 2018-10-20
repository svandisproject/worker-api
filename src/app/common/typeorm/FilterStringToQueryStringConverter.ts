import { FilterOption } from "./FilterOption";
import * as _ from "lodash";


export class FilterStringToQueryStringConverter {
    public static convert(filterString: string): string {
        const filterOptions = this.decode(filterString);

        const operationsMap = {
            'eq': '=',
            'gt': '>',
            'lt': '<',
            'lk': 'LIKE',
            'in': 'IN'
        };

        let queryOptions = filterOptions.map(option => {
            let str = `${option.property} ${operationsMap[option.type]} `;
            if (_.isString(option.value)) {
                str += `'${option.value}'`;
            } else {
                str += _.toString(option.value);
            }
            return str;
        });

        return queryOptions.join(' and ');
    }

    private static decode(filterString: string): FilterOption[] {
        return JSON.parse(Buffer.from(filterString, 'base64').toString());
    }
}