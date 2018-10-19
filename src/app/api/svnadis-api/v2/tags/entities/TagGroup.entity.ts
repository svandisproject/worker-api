import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiModelProperty} from "@nestjs/swagger";
import {TagEntity} from "./Tag.entity";

@Entity({name: 'tag-group'})
export class TagGroupEntity {
    @ApiModelProperty()
    @PrimaryGeneratedColumn()
    id: number;
    @ApiModelProperty()
    @Column({length: 500})
    title: string;
    @ApiModelProperty()
    @Column()
    enabled: boolean;
    @ApiModelProperty()
    @OneToMany((type) => TagEntity, (tag) => tag.tagGroup)
    tags: TagEntity[];
}
