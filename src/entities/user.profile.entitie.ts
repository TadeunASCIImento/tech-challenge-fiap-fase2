import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IUserProfile } from "./interfaces/user.profile.interface";

@Entity({
    name:'user_profile'
})
export class UserProfile implements IUserProfile {

    @PrimaryGeneratedColumn({
        name:'id',
        type:'bigint'
    })
    id: number;

    @Column({
        name: 'profile',
        type: 'varchar'
    })
    profile: string;

}