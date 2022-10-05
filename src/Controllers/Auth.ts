import { Express, Request, Response } from "express"
import { CreateToken } from "../Helpers/CreateTokenHelper";
import { TokenToUserDTO } from "../Model/DTOs/TokenToUserDTO";
import { UserFromClientDTO } from "../Model/DTOs/UserFromClientDTO";

import { RegisterUserCase } from "../UseCases/AuthCases";

export const UseAuth = (app: Express): void => {

    //Регистрирует пользователя и возвращает новый токен.
    app.post('/signin', (req: Request, res: Response) => {
        let data: UserFromClientDTO = req.body;

        RegisterUserCase(data)
            //FIXME: Это точно должно быть в контроллере?
            .then(() => {
                let tokenStr = CreateToken(data.email);
                var token: TokenToUserDTO = {
                    token: tokenStr,
                    expire: process.env.JWT_TOKEN_LIFETIME_SECONDS as any
                };

                res.statusCode = 200;
                res.json(token);
            })
            .catch(err => {
                res.statusCode = 400;
                //FIXME: Даже внутрнние исключения от слоя с данными всплывают сюда.
                // Некрасиво, возможно небезопасно. Вместо них стоит как-то возвращать более осмысленные собщения.
                res.json({ message: err.message });
            });
    });
}
