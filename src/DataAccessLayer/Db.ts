import { Pool, QueryResult } from "pg"


// Упрощает общение с БД, инкапсулируя подключение к ней.
export class Db {

    // Возвращает новый экземпляр Pool, выполняющий здесь роль клиента к БД.
    // Формируется в рантайме т.к. использует переменные среды.
    private static readonly GetPool = (): Pool => {
        return new Pool({
            user: process.env.DB_USER as string,
            host: process.env.DB_HOST as string,
            database: process.env.DB_DATABASE_NAME as string,
            password: (process.env.DB_PASSWORD)?.toString(),
            port: parseInt(process.env.DB_PORT as string),
        })
    }

    // Выполняет запрос к БД.
    public static readonly Query = (text: string, params: any): Promise<QueryResult<any>> => {
        var pool: any = Db.GetPool();

        return pool.query({
            text: text,
            values: params
        })
    }
}