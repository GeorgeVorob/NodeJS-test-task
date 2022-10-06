import { TagsRepository } from "../DataAccessLayer/TagsRepository";
import { UserRepository } from "../DataAccessLayer/UserRepository"
import { UserToClientDTO } from "../Model/DTOs/UserToClientDTO";
import { Tag } from "../Model/models/tag";
import { User } from "../Model/models/user"

export const GetUserCase = async (UserEmail: string): Promise<UserToClientDTO> => {
    var user: User;
    var tags: Tag[] = [];
    var responseDTO: UserToClientDTO;

    await UserRepository.FindUserExact({ email: UserEmail })
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