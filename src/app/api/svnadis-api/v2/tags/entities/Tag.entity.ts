import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Tag} from "../dataModel/Tag";
import {ApiModelProperty} from "@nestjs/swagger";
import {TagGroupEntity} from "./TagGroup.entity";

@Entity({name: 'tag'})
export class TagEntity implements Tag {
    @ApiModelProperty()
    @PrimaryGeneratedColumn()
    id: string;

    @ApiModelProperty()
    @Column({length: 500})
    title: string;

    @ManyToOne((type) => TagGroupEntity, (tagGroup) => tagGroup.tags)
    tagGroup: TagGroupEntity;
}
