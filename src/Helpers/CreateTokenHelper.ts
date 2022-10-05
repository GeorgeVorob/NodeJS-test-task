import * as jwt from 'jsonwebtoken'
import { TokenToUserDTO } from '../Model/DTOs/TokenToUserDTO';

// Возвращает строку нового токена.
export const CreateToken = (data: any): string => {
    return jwt.sign(
        { data: data },
        process.env.JWT_KEY as string,
        {
            expiresIn: parseInt(process.env.JWT_TOKEN_LIFETIME_SECONDS as string)
        });
}

export const CreateTokenDTO = (data: any): TokenToUserDTO => {
    return {
        token: CreateToken(data),
        expire: parseInt(process.env.JWT_TOKEN_LIFETIME_SECONDS as string)
    }
}