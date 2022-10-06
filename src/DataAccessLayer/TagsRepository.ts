import { QueryResult } from "pg";
import { UserFromClientDTO } from "../Model/DTOs/UserFromClientDTO";
import { Tag } from "../Model/models/tag";
import { User } from "../Model/models/user";
import { Db } from "./Db";

// Класс для работы с сущностями тегов в базе данных.
export class TagsRepository {
    //TODO: Много вариантов, по какому конкретно полю искать пользователя. Можно добавить перегрузки или ещё как-то усложнить метод.
    public static async GetTagsForUser(user: User): Promise<Tag[]> {
        let query: string = `SELECT tags.id, tags.creator, tags.name, tags.sortorder FROM tags
        JOIN userstags ON tags.id = userstags.tag
        WHERE userstags.taggeduser = $1;`;

        return Db.Query(
            query,
            [user.uid]
        )
            .then((res: QueryResult<any>) => {
                return res.rows as Tag[];
            });
    }
}