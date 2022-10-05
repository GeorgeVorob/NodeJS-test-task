import { QueryResult } from "pg";
import { UserFromClientDTO } from "../Model/DTOs/UserFromClientDTO";
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
}
