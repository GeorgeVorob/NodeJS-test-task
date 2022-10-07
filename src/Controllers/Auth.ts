import { Express, Request, Response } from "express"
import { CheckToken } from "../MIddlewares/CheckToken";
import { UserFromClientDTO } from "../Model/DTOs/UserFromClientDTO";
import { JWTService } from "../Services/JWTService";

import { LogInUserCase, RegisterUserCase } from "../UseCases/AuthCases";

export const UseAuth = (app: Express): void => {

    //Регистрирует пользователя и возвращает новый токен.
    app.post('/signin', (req: Request, res: Response) => {
        let data: UserFromClientDTO = req.body;
        RegisterUserCase(data)
            .then((result) => {
                res.statusCode = 200;
                res.json(result);
            })
            .catch(err => {
                res.statusCode = 400;
                //FIXME: Даже внутрнние исключения от слоя с данными всплывают сюда.
                // Некрасиво, возможно небезопасно. Вместо них стоит как-то возвращать более осмысленные сообщения.
                res.json({ message: err.message });
            });
    });

    //Логинит пользователя и возвращает новый токен при успешном логине.
    app.post('/login', (req: Request, res: Response) => {
        let data: UserFromClientDTO = req.body;
        LogInUserCase(data)
            .then((result) => {
                res.statusCode = 200;
                res.json(result);
            })
            .catch(err => {
                res.statusCode = 400;
                res.json({ message: err.message });
            });
    });

    //Разлогинивает пользователя, инвалидируя его текущий токен.
    app.post('/logout', CheckToken, (req: Request, res: Response) => {
        JWTService.InvalidateToken((req as any).token);
        res.sendStatus(200);
    });
}
