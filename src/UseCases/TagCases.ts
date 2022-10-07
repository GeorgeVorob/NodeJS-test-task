import { TagsRepository } from "../DataAccessLayer/TagsRepository";
import { UserRepository } from "../DataAccessLayer/UserRepository"
import { TagFromUserDTO } from "../Model/DTOs/TagFromUserDTO";
import { NewTagToUserDTO } from "../Model/DTOs/NewTagToUserDTO";
import { UpdatedUserToClientDTO } from "../Model/DTOs/UpdatedUserToClientDTO";
import { UserFromClientDTO } from "../Model/DTOs/UserFromClientDTO";
import { UserToClientDTO } from "../Model/DTOs/UserToClientDTO";
import { Tag } from "../Model/models/tag";
import { FullTagToUserDTO } from "../Model/DTOs/FullTagToUserDTO";
import { User } from "../Model/models/user";

export const CreateTagCase = async (newTag: TagFromUserDTO, creatorUid: string): Promise<NewTagToUserDTO> => {
    if (newTag.name.length > 40) throw new Error("Tag name is too long! Max: 40.");

    let returnDTO: NewTagToUserDTO;

    await TagsRepository.CreateTag(newTag, creatorUid)
        .then((res) => {
            returnDTO = { id: res.id, name: res.name, sortorder: res.sortorder };
        });

    return returnDTO!;
}

export const GetTagByIdCase = async (tagId: number): Promise<FullTagToUserDTO | null> => {
    let foundTag: Tag | null = null;
    let foundCreator: User | null = null;

    await TagsRepository.GetTagById(tagId).then((res) => { foundTag = res; });
    foundTag = foundTag!;

    if (!foundTag) return null;

    await UserRepository.FindUserExact({ uid: foundTag.creator }).then((res) => { foundCreator = res })
    foundCreator = foundCreator as any;


    return {
        creator: foundCreator ? { uid: foundCreator.uid, nickname: foundCreator.nickname } : null,
        name: foundTag.name,
        sortOrder: foundTag.sortorder
    }
}