import {ApiModelProperty} from "@nestjs/swagger";

export class Post {
    @ApiModelProperty()
    id?: string;
    @ApiModelProperty()
    title?: string;
    @ApiModelProperty()
    url?: string;
    @ApiModelProperty()
    content?: string;
    @ApiModelProperty()
    source?: string;
    @ApiModelProperty()
    published_at?: Date;
    @ApiModelProperty()
    created_at?: Date;
    @ApiModelProperty()
    imageUrl?: string;
    @ApiModelProperty()
    tags?: any[];
}
