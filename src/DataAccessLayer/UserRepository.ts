import { QueryResult } from "pg";
import { UserFromClientDTO } from "../Model/DTOs/UserFromClientDTO";
import { User } from "../Model/models/user";
import { Db } from "./Db";

// Класс для работы с сущностями пользователей в базе данных.
export class UserRepository {

    public static async AddUser(userData: UserFromClientDTO): Promise<void> {
        await Db.Query(
            "INSERT INTO users (email, password, nickname) VALUES ($1,$2,$3);",
            [userData.email,
            userData.password,
            userData.nickname])
    };

    // Находит пользователя при точном соответствии переданных данных.
    public static async FindUserExact(userData: UserFromClientDTO): Promise<User | null> {
        let query: string;
        let params: string[] = [];
        query = "SELECT * FROM users";
        if (userData && (userData.email || userData.nickname || userData.password)) {
            query += " WHERE";

            if (userData.email) {
                query += ` email = \$${params.length + 1}`
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
}
