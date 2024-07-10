import { IUser } from "../entities/interfaces/user.interface";
import { UserProfileEnum } from "../enums/user,profile.enum";
import { makeUserProfile } from "../use-cases/factories/user.profile.factory";


export async function hasPermission(user: IUser) {
    const userProfile = await makeUserProfile().handlerFindProfile(user.username);

    if (!userProfile || userProfile.profile === UserProfileEnum.USER_ADMIN) {
        return userProfile;
    }

}
