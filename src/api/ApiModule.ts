import {Global, Module} from "@nestjs/common";
import {SvandisApiModule} from "./svandis/SvandisApiModule";
import {HttpModule} from "@nestjs/common/http";

@Global()
@Module({
    imports: [
        SvandisApiModule
    ],
    exports: [
        SvandisApiModule
    ]
})
export class ApiModule {

}