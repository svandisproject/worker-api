import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Tag} from "../dataModel/Tag";

@Entity({name: 'tag'})
export class TagEntity implements Tag {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({length: 500})
    title: string;
}
