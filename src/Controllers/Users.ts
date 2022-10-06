import { Express, Request, Response } from "express"
import { CheckToken } from "../MIddlewares/CheckToken";
import { UserToClientDTO } from "../Model/DTOs/UserToClientDTO";
import { User } from "../Model/models/user";
import { GetUserCase } from "../UseCases/UserCases";

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
}