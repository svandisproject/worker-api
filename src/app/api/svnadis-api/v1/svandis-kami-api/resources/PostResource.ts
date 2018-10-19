import {HttpService, Injectable} from "@nestjs/common";
import {SvandisApi} from "../config/SvandisApi";
import {Observable} from "rxjs/Observable";
import {Post} from "../../../v2/statisctics/dataModel/Post";
import {AxiosResponse} from "axios";

@Injectable()
export class PostResource {
    private readonly URL: string = SvandisApi.API_URL;

    constructor(private httpService: HttpService) {
    }

    public findAll(token: string): Observable<AxiosResponse<Post[]>> {
        return this.httpService.get(this.URL + '/post', {
            headers: {Authorization: token}
        });
    }
}
