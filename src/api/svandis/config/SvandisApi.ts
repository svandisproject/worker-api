import {ConfigLoader} from "../../../config/ConfigLoader";

export class SvandisApi {
    public static readonly API_URL = ConfigLoader.loadConfig("API_HOST") + '/api';
    public static readonly API_SECRET = ConfigLoader.loadConfig("API_SECRET");
}
