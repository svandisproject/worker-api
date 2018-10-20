import {Injectable} from "@nestjs/common";
import {PostResource} from "../../v1/svandis-kami-api/resources/PostResource";

@Injectable()
export class AuthService {
    constructor(private readonly postResource: PostResource) {
    }

    async validateUser(token: string): Promise<any> {
        try {
            return await this.postResource.findAll(token).toPromise();
        } catch (err) {
            return null;
        }
    }
}
