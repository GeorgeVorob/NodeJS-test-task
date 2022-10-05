import { TokenToUserDTO } from "../Model/DTOs/TokenToUserDTO";
import * as jwt from "jsonwebtoken";

// Мне не удалось скачать 4 мегабайта сервера Redis, поэтому тут самопиская реализация!
//TODO: Переписать с использоанием Redis.

// Сервис для работы с токенами авторизации.
// Создает новые токены и сохраняет в черный список те, что были отмечены как невалидные раньше своего времени жизни (напр. при логауте).
// В проверке токенов также ссылается на черный список помимо валидности токена по тоаймеру.
// Черный список периодически очищается от токенов, которые вытекли по времени сами по себе.
export class JWTService {
    private static timer: NodeJS.Timer = setInterval(() => JWTService.cleanupTokenBlacklist(), 60000);
    private static tokenBlacklist: string[] = [];

    // Очищает черный список от токенов, которые уже невалидны сами по себе.
    private static cleanupTokenBlacklist = () => {
        JWTService.tokenBlacklist.filter(token => {
            try {
                jwt.verify(token, process.env.JWT_KEY as string);
                return true;
            }
            catch
            {
                return false;
            }
        });
    }

    // Возвращает новый токен.
    public static readonly CreateToken = (data: any): string => {
        return jwt.sign(
            { data: data },
            process.env.JWT_KEY as string,
            {
                expiresIn: parseInt(process.env.JWT_TOKEN_LIFETIME_SECONDS as string)
            });
    }

    // Возвращает новый токен в формате DTO для отправки клиенту.
    public static readonly CreateTokenDTO = (data: any): TokenToUserDTO => {
        return {
            token: JWTService.CreateToken(data),
            expire: parseInt(process.env.JWT_TOKEN_LIFETIME_SECONDS as string)
        }
    }

    // Записывает токен в черный список, делая его невалидным.
    public static readonly InvalidateToken = (token: string): void => {
        if (!JWTService.tokenBlacklist.includes(token))
            JWTService.tokenBlacklist.push(token);
    }

    // Проверяет токен ан валидность.
    public static readonly CheckToken = (token: string): any => {
        if (JWTService.tokenBlacklist.includes(token)) return null;
        try {
            return jwt.verify(token, process.env.JWT_KEY as any);
        }
        catch
        {
            return null;
        }
    }
}