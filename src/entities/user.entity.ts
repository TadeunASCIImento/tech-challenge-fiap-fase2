import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "./interfaces/user.interface";

@Entity({
    name:'users'
})
export class User implements IUser {

    @PrimaryGeneratedColumn('uuid', {
        name:'id',
    })
    id?: string | undefined;

    @Column({
        name: 'user_name',
        type: 'varchar'
    })
    username: string;

    @Column({
        name:'password',
        type: 'varchar'
    })
    password: string;

}