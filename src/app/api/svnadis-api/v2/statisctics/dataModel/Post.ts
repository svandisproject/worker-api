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
    @ApiModelProperty({type: Date})
    published_at?: Date;
    @ApiModelProperty({type: Date})
    created_at?: Date;
    @ApiModelProperty()
    imageUrl?: string;
    @ApiModelProperty()
    tags?: any[];
}
