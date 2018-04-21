import {ConfigLoader} from "./ConfigLoader";

export const AppConfig = {
    APP_PORT: ConfigLoader.loadConfig("APP_PORT")
};
