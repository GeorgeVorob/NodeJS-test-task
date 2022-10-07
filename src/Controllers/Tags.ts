import { Express, Request, Response } from "express"
import { CheckToken } from "../MIddlewares/CheckToken";
import { TagToUserDTO } from "../Model/DTOs/TagToUserDTO";
import { UserFromClientDTO } from "../Model/DTOs/UserFromClientDTO";
import { JWTService } from "../Services/JWTService";

import { LogInUserCase, RegisterUserCase } from "../UseCases/AuthCases";
import { CreateTagCase } from "../UseCases/TagCases";

export const UseTags = (app: Express): void => {
    app.post('/tag', CheckToken, (req: Request, res: Response) => {
        CreateTagCase(req.body, (req as any).tokenData.data)
            .then((result: TagToUserDTO) => {
                res.json(result);
            })
            .catch((err: Error) => {
                res.statusCode = 403;
                res.json({ message: err.message });
            })
    });
}
