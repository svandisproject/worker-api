import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {ApiModelProperty} from "@nestjs/swagger";
import {TagEntity} from "./Tag.entity";

@Entity({name: 'tag_group'})
export class TagGroupEntity {
    @ApiModelProperty()
    @PrimaryColumn()
    id: number;
    @ApiModelProperty()
    @Column({length: 500})
    title: string;
    @ApiModelProperty()
    @Column()
    enabled: boolean;

    @ApiModelProperty()
    @OneToMany((type) => TagEntity, (tag) => tag.group)
    tags: TagEntity[];
}
