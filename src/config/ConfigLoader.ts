import * as _ from "lodash";

export class ConfigLoader {
    private static readonly CONFIG_PATH: string = 'env/configs.json';
    private static readonly CONFIG =
        JSON.parse(require('fs').readFileSync(ConfigLoader.CONFIG_PATH, 'utf8'));

    /**
     * get a config by path
     * @param {string} keyPath 'key.subKey'
     * @returns {any}
     */
    public static loadConfig(keyPath: string): any {
        return _.get(ConfigLoader.CONFIG, keyPath);
    }
}
