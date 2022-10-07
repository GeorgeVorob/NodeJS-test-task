import { QueryResult } from "pg";
import { UserFromClientDTO } from "../Model/DTOs/UserFromClientDTO";
import { User } from "../Model/models/user";
import { Db } from "./Db";

// Класс для работы с сущностями пользователей в базе данных.
export class UserRepository {

    public static async AddUser(userData: UserFromClientDTO): Promise<User> {
        return Db.Query(
            "INSERT INTO users (email, password, nickname) VALUES ( $1 , $2 , $3 ) RETURNING uid, email, password, nickname;",
            [userData.email,
            userData.password,
            userData.nickname])
            .then((res: QueryResult<any>) => {
                return res.rows[0] as User;
            })
    };

    // Находит пользователя при точном соответствии переданных данных.
    public static async FindUserExact(
        userData: {
            uid?: string,
            email?: string,
            password?: string,
            nickname?: string
        }
    ): Promise<User | null> {
        let query: string;
        let params: string[] = [];
        query = "SELECT * FROM users";
        if (userData && (userData.email || userData.nickname || userData.password || userData.uid)) {
            query += " WHERE 1=1";

            if (userData.uid) {
                query += ` AND uid = \$${params.length + 1}`
                params.push(userData.uid);
            }
            if (userData.email) {
                query += ` AND email = \$${params.length + 1}`
                params.push(userData.email);
            }
            if (userData.password) {
                query += ` AND password = \$${params.length + 1}`
                params.push(userData.password);
            }
            if (userData.nickname) {
                query += ` AND nickname = \$${params.length + 1}`
                params.push(userData.nickname);
            }
        }

        query += ";";
        return Db.Query(query, params)
            .then((res: QueryResult<any>) => {
                if (res && res.rows && res.rows[0])
                    return res.rows[0]
                else return null;
            });
    }

    public static async UpdateUser(newData: UserFromClientDTO, uid: string): Promise<void> {
        let query: string = "UPDATE users";
        let params: string[] = [];

        //FIXME: Костыль. Корректная комманда требует хотя-бы одного SET.
        query += ` SET uid='${uid}'`;

        if (newData && (newData.email || newData.nickname || newData.password)) {

            if (newData.email) {
                query += `, email = \$${params.length + 1}`
                params.push(newData.email);
            }
            if (newData.password) {
                query += `, password = \$${params.length + 1}`
                params.push(newData.password);
            }
            if (newData.nickname) {
                query += `, nickname = \$${params.length + 1}`
                params.push(newData.nickname);
            }
        }

        query += ` WHERE uid='${uid}'`
        query += ";";

        await Db.Query(query, params);
    }

    public static async DeleteUser(userToDelete: User | string): Promise<void> {
        let uidToDelete = userToDelete instanceof User ? userToDelete.uid : userToDelete;
        let query: string = "DELETE FROM users WHERE uid= $1 ;";

        await Db.Query(query, [uidToDelete]);
    }
}
