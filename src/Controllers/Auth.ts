import { Express, Request, Response } from "express"
import { CreateToken, CreateTokenDTO } from "../Helpers/CreateTokenHelper";
import { TokenToUserDTO } from "../Model/DTOs/TokenToUserDTO";
import { UserFromClientDTO } from "../Model/DTOs/UserFromClientDTO";

import { LogInUserCase, RegisterUserCase } from "../UseCases/AuthCases";

export const UseAuth = (app: Express): void => {

    //Регистрирует пользователя и возвращает новый токен.
    app.post('/signin', (req: Request, res: Response) => {
        let data: UserFromClientDTO = req.body;
        RegisterUserCase(data)

            //FIXME: Это точно должно быть в контроллере?
            .then(() => {
                res.statusCode = 200;
                res.json(CreateTokenDTO(data.email));
            })
            .catch(err => {
                res.statusCode = 400;
                //FIXME: Даже внутрнние исключения от слоя с данными всплывают сюда.
                // Некрасиво, возможно небезопасно. Вместо них стоит как-то возвращать более осмысленные собщения.
                res.json({ message: err.message });
            });
    });

    //Логинит пользователя и возвращает новый токен при успешном логине.
    app.post('/login', (req: Request, res: Response) => {
        let data: UserFromClientDTO = req.body;
        LogInUserCase(data)
            .then(() => {
                res.statusCode = 200;
                res.json(CreateTokenDTO(data.email));
            })
            .catch(err => {
                res.statusCode = 400;
                res.json({ message: err.message });
            });
    });

}
