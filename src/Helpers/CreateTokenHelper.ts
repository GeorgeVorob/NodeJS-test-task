import * as jwt from 'jsonwebtoken'

// Возвращает строку нового токена.
export const CreateToken = (data: any): string => {
    return jwt.sign(
        { data: data },
        process.env.JWT_KEY as string,
        {
            expiresIn: parseInt(process.env.JWT_TOKEN_LIFETIME_SECONDS as string)
        });
}