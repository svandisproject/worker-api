import {Controller, Get, Req} from "@nestjs/common";

@Controller('statistics')
export class StatisticsController {
    @Get()
    findAll(@Req() request): string[] {
        return [];
    }
}
