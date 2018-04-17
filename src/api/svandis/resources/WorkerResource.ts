import {HttpService} from "@nestjs/common/http";
import {Component} from "@nestjs/common";
import {SvandisApi} from "../config/SvandisApi";
import {Observable} from "rxjs/Observable";
import {ScheduledWorker} from "./dataModel/ScheduledWorker";
import {AxiosResponse} from "@nestjs/common/http/interfaces/axios.interfaces";

@Component()
export class WorkerResource {
    private readonly URL: string = SvandisApi.URL;

    constructor(private httpService: HttpService) {
    }

    public schedule(): Observable<AxiosResponse<ScheduledWorker[]>> {

        return this.httpService.get(this.URL + '/schedule', {
            headers: {'X-SOCKET-SERVER-TOKEN': SvandisApi.API_SECRET}
        });
    }
}