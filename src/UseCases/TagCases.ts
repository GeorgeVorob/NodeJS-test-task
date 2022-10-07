import { TagsRepository } from "../DataAccessLayer/TagsRepository";
import { UserRepository } from "../DataAccessLayer/UserRepository"
import { TagFromUserDTO } from "../Model/DTOs/TagFromUserDTO";
import { TagToUserDTO } from "../Model/DTOs/TagToUserDTO";
import { UpdatedUserToClientDTO } from "../Model/DTOs/UpdatedUserToClientDTO";
import { UserFromClientDTO } from "../Model/DTOs/UserFromClientDTO";
import { UserToClientDTO } from "../Model/DTOs/UserToClientDTO";
import { Tag } from "../Model/models/tag";

export const CreateTagCase = async (newTag: TagFromUserDTO, creatorUid: string): Promise<TagToUserDTO> => {
    if (newTag.name.length > 40) throw new Error("Tag name is too long! Max: 40.");

    let returnDTO: TagToUserDTO;

    await TagsRepository.CreateTag(newTag, creatorUid)
        .then((res) => {
            returnDTO = { id: res.id, name: res.name, sortorder: res.sortorder };
        });

    return returnDTO!;
}