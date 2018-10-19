import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Tag} from "../dataModel/Tag";
import {ApiModelProperty} from "@nestjs/swagger";

@Entity({name: 'tag'})
export class TagEntity implements Tag {
    @ApiModelProperty()
    @PrimaryGeneratedColumn()
    id: string;

    @ApiModelProperty()
    @Column({length: 500})
    title: string;
}
