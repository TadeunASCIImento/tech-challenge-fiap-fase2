import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IPost } from "./interfaces/post.interface";

@Entity({
    name:'post'
})
export class Post implements IPost{

    @PrimaryGeneratedColumn('uuid',{
        name: 'id'
    })
    id?: string | undefined;

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