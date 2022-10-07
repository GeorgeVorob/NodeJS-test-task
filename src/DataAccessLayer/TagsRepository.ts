import e from "express";
import { QueryResult } from "pg";
import { TagFromUserDTO } from "../Model/DTOs/TagFromUserDTO";
import { TagSearchParams as TagSearchParams } from "../Model/DTOs/TagSearchParams";
import { UserFromClientDTO } from "../Model/DTOs/UserFromClientDTO";
import { Tag } from "../Model/models/tag";
import { User } from "../Model/models/user";
import { Db } from "./Db";

// Класс для работы с сущностями тегов в базе данных.
export class TagsRepository {
    public static async GetTagsForUser(user: User): Promise<Tag[]> {
        let query: string = `SELECT tags.id, tags.creator, tags.name, tags.sortorder FROM tags
        JOIN userstags ON tags.id = userstags.tag
        WHERE userstags.taggeduser = $1 ;`;

        return Db.Query(
            query,
            [user.uid]
        )
            .then((res: QueryResult<any>) => {
                return res.rows as Tag[];
            });
    }

    public static async GetTagById(tagId: number): Promise<Tag | null> {
        return Db.Query("SELECT * FROM tags WHERE tags.id = $1", [tagId])
            .then((res => {
                if (res.rows.length > 0)
                    return res.rows[0] as Tag
                else return null;
            }));
    }

    public static async CreateTag(tag: TagFromUserDTO, creatorUid: string): Promise<Tag> {
        if (!tag.sortOrder) tag.sortOrder = 0;
        let query: string = `INSERT INTO tags (creator, name, sortorder) 
        VALUES ( $1 , $2 , $3 ) 
        RETURNING id, creator, name, sortorder;`;

        return Db.Query(query,
            [creatorUid, tag.name, tag.sortOrder])
            .then((res: QueryResult<any>) => {
                return res.rows[0] as Tag;
            })
            .catch((err) => {
                return 1 as any;
            })

    }

    public static async GetTags(params: TagSearchParams): Promise<Tag[]> {
        let query: string = "SELECT * FROM tags WHERE 1=1";
        let queryParams: string[] = [];

        if (params.SortByName) {
            query += " ORDER BY name";
        }
        else if (params.sortByOrder) query += " ORDER BY sortorder";

        if (params.length) {
            query += ` LIMIT \$${queryParams.length + 1}`;
            queryParams.push(params.length.toString());
        }

        if (params.offset) {
            query += ` OFFSET \$${queryParams.length + 1}`;
            queryParams.push(params.offset.toString());
        }

        query += " ;";
        return Db.Query(query, queryParams)
            .then((res: QueryResult<any>) => {
                return res.rows as Tag[];
            })
    }

}