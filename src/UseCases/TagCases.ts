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
import { TagSearchParams } from "../Model/DTOs/TagSearchParams";
import { TagEditInfoFromClientDTO } from "../Model/DTOs/TagEditInfoFromClientDTO";

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

export const GetTagsCase = async (params: TagSearchParams): Promise<FullTagToUserDTO[]> => {
    let rawTags: Tag[] = [];
    await TagsRepository.GetTags(params).then((res) => { rawTags = res; })

    let userPromises: Promise<User | null>[] = rawTags.map(tag => {
        var tagCreator: User;
        return UserRepository.FindUserExact({ uid: tag.creator }).then((res) => {
            return res;
        })
    })

    let retval: FullTagToUserDTO[] = [];
    await Promise.all(userPromises)
        .then(users => {
            return users.forEach((user, index) => {
                retval.push(
                    {
                        name: rawTags[index].name,
                        sortOrder: rawTags[index].sortorder,
                        creator: user != null ? { uid: user.uid, nickname: user.nickname } : null
                    }
                );
            });
        })

    return retval;
}

export const EditTagByCase = async (params: TagEditInfoFromClientDTO, tagId: number, clientUid: string): Promise<FullTagToUserDTO> => {
    let foundTag: Tag;
    await TagsRepository.GetTagById(tagId).then((res) => {
        if (res) foundTag = res;
        else throw new Error("Tag with such id not found!")
    })
    foundTag = foundTag!;

    if (foundTag.creator != clientUid) throw new Error("This tag does not belong to the user!");

    let editedTag: Tag;
    await TagsRepository.UpdateTag(tagId, { name: params.name, sortOrder: params.sortOrder }).then((res) => { editedTag = res });
    editedTag = editedTag!;

    let user: User;
    await UserRepository.FindUserExact({ uid: clientUid }).then((res => { user = res! }));
    user = user!;

    return {
        creator: {
            nickname: user.nickname,
            uid: user.uid
        },
        name: editedTag.name,
        sortOrder: editedTag.sortorder
    }
}