import { Express, Request, Response } from "express"
import { CheckToken } from "../MIddlewares/CheckToken";
import { UpdatedUserToClientDTO } from "../Model/DTOs/UpdatedUserToClientDTO";
import { UserFromClientDTO } from "../Model/DTOs/UserFromClientDTO";
import { UserToClientDTO } from "../Model/DTOs/UserToClientDTO";
import { User } from "../Model/models/user";
import { GetUserCase, UpdateUserCase } from "../UseCases/UserCases";

export const UseUsers = (app: Express): void => {
    app.get('/user', CheckToken, (req: Request, res: Response) => {
        GetUserCase((req as any).tokenData.data)
            .then((result: UserToClientDTO) => {
                res.json(result);
            })
            .catch((err: Error) => {
                res.statusCode = 403;
                res.json({ message: err.message });
            })
    })

    app.put('/user', CheckToken, (req: Request, res: Response) => {
        var dto: UserFromClientDTO = req.body as UserFromClientDTO;

        //FIXME: Решить, куда класть такого рода валидаию.
        if (!dto) {
            res.statusCode = 400;
            res.json({ message: "No expexted data supplied!" });
        }
        UpdateUserCase(req.body, (req as any).tokenData.data)
            .then((result: UpdatedUserToClientDTO) => {
                res.json(result);
            })
            .catch((err: Error) => {
                res.statusCode = 400;
                res.json({ message: err.message });
            })
    })
}