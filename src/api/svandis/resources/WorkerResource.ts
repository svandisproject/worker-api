import {HttpService} from "@nestjs/common/http";
import {Component} from "@nestjs/common";
import {SvandisApi} from "../config/SvandisApi";
import {Observable} from "rxjs/Observable";
import {TaskConfiguration} from "./dataModel/TaskConfiguration";
import {AxiosResponse} from "@nestjs/common/http/interfaces/axios.interfaces";

/**
 * TODO: Error handling required
 */
@Component()
export class WorkerResource {
    private readonly URL: string = SvandisApi.API_URL;
    private readonly SOCKET_TOKEN: string = SvandisApi.API_SECRET;

    constructor(private httpService: HttpService) {
    }

    public schedule(): Observable<AxiosResponse<TaskConfiguration[]>> {
        return this.httpService.get(this.URL + '/schedule', {
            headers: {'X-SOCKET-SERVER-TOKEN': this.SOCKET_TOKEN}
        });
    }
}
