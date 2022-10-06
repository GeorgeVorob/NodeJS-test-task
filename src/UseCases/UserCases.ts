import { TagsRepository } from "../DataAccessLayer/TagsRepository";
import { UserRepository } from "../DataAccessLayer/UserRepository"
import { UpdatedUserToClientDTO } from "../Model/DTOs/UpdatedUserToClientDTO";
import { UserFromClientDTO } from "../Model/DTOs/UserFromClientDTO";
import { UserToClientDTO } from "../Model/DTOs/UserToClientDTO";
import { Tag } from "../Model/models/tag";
import { User } from "../Model/models/user"
import { ValidateUserInfo } from "../Model/validators/UserInfoValidator";
import { JWTService } from "../Services/JWTService";

export const GetUserCase = async (UserUid: string): Promise<UserToClientDTO> => {
    var user: User;
    var tags: Tag[] = [];
    var responseDTO: UserToClientDTO;

    await UserRepository.FindUserExact({ uid: UserUid })
        .then(usr => {
            if (!usr)
                throw new Error('No such user');
            else {
                user = usr;

            }
        });

    // Метод выше с await, поэтому десь переменная user точно задана.
    await TagsRepository.GetTagsForUser(user!)
        .then(tgs => {
            tags = tgs;
        });

    responseDTO = {
        email: user!.email,
        nickname: user!.nickname,
        tags: tags.map(t => { return { id: t.id, name: t.name, sortOrder: t.sortorder } }) as any
    }
    return responseDTO;
}

export const UpdateUserCase = async (newUserInfo: UserFromClientDTO, userToUpdateUid: string): Promise<UpdatedUserToClientDTO> => {
    ValidateUserInfo(newUserInfo, true);
    var userToUpdate: User | null;
    await UserRepository.FindUserExact({ uid: userToUpdateUid }).then((res) => { userToUpdate = res });

    // Костыль, чтобы заглушить typescirpt далее.
    userToUpdate = userToUpdate! as User;

    if (!userToUpdate) throw new Error("User with such token not found!");

    if (newUserInfo.nickname)
        await UserRepository.FindUserExact({ nickname: newUserInfo.nickname })
            .then((res) => {
                if (res && res.uid != userToUpdate?.uid) throw new Error("This nickname already taken!")
            });

    if (newUserInfo.email)
        await UserRepository.FindUserExact({ email: newUserInfo.email })
            .then((res) => {
                if (res && res.uid != userToUpdate?.uid) throw new Error("This email already in use!")
            });

    await UserRepository.UpdateUser(newUserInfo, userToUpdate.uid);

    var updatedUser: User | null;
    await UserRepository.FindUserExact({ uid: userToUpdateUid }).then((res) => { updatedUser = res });

    return { email: updatedUser!.email, nickname: updatedUser!.nickname };
}

export const DeleteUserCase = async (uidToDelete: string, tokenToInvalidate: string): Promise<void> => {
    await UserRepository.DeleteUser(uidToDelete);
    JWTService.InvalidateToken(tokenToInvalidate);
}