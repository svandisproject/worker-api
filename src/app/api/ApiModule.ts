import {Global, Module} from "@nestjs/common";
import {SvandisApiModule} from "./svandis/SvandisApiModule";

@Global()
@Module({
    imports: [
        SvandisApiModule,
    ],
    exports: [
        SvandisApiModule
    ]
})
export class ApiModule {

}
