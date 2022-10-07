import { Express, Request, Response } from "express"
import { CheckToken } from "../MIddlewares/CheckToken";
import { FullTagToUserDTO } from "../Model/DTOs/FullTagToUserDTO";
import { NewTagToUserDTO } from "../Model/DTOs/NewTagToUserDTO";
import { UserFromClientDTO } from "../Model/DTOs/UserFromClientDTO";
import { Tag } from "../Model/models/tag";
import { JWTService } from "../Services/JWTService";

import { LogInUserCase, RegisterUserCase } from "../UseCases/AuthCases";
import { CreateTagCase, GetTagByIdCase } from "../UseCases/TagCases";

export const UseTags = (app: Express): void => {
    app.post('/tag', CheckToken, (req: Request, res: Response) => {
        CreateTagCase(req.body, (req as any).tokenData.data)
            .then((result: NewTagToUserDTO) => {
                res.json(result);
            })
            .catch((err: Error) => {
                res.statusCode = 400;
                res.json({ message: err.message });
            })
    });

    app.get('/tag/:id', CheckToken, (req: Request, res: Response) => {
        let id: number = parseInt(req.params.id);

        GetTagByIdCase(id)
            .then((result: FullTagToUserDTO | null) => {
                res.json(result);
            })
            .catch((err: Error) => {
                res.statusCode = 400;
                res.json({ message: err.message });
            })
    });
}
