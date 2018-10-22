import {FilterOption} from "./FilterOption";
import * as _ from "lodash";

export class FilterStringToQueryStringConverter {
    public static convert(filterString: string, queryBuilderPrefix = ''): string {
        const filterOptions = this.decode(filterString);

        const operationsMap = {
            eq: '=',
            ne: '<>',
            gt: '>',
            lt: '<',
            lk: 'LIKE',
            in: 'IN'
        };

        const queryOptions = filterOptions.map((option) => {
            let str = `${option.property} ${operationsMap[option.type]} `;
            
            if (!_.isEmpty(queryBuilderPrefix)) {
                str = `${queryBuilderPrefix}.${str}`;
            }

            str += this.formatValue(option.value);

            return str;
        });

        return queryOptions.join(' and ');
    }

    private static decode(filterString: string): FilterOption[] {
        return JSON.parse(Buffer.from(filterString, 'base64').toString());
    }

    private static formatValue(value: any) {
        if (_.isString(value)) {
            return `'${value}'`;
        } else {
            return _.toString(value);
        }
    }
}
