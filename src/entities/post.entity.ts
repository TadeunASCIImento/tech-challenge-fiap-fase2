import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IPost } from "./interfaces/post.interface";

@Entity({
    name:'posts'
})
export class Post implements IPost{

    @PrimaryGeneratedColumn({
        name: 'id'
    })
    id?: number | undefined;

    @Column({
        name: 'title',
        type: 'varchar'
    })
    title: string;

    @Column({
        name: 'description',
        type: 'varchar'
    })
    description: string;

}