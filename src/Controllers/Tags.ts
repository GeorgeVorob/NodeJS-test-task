import { Express, Request, Response } from "express"
import { CheckToken } from "../MIddlewares/CheckToken";
import { FullTagToUserDTO } from "../Model/DTOs/FullTagToUserDTO";
import { NewTagToUserDTO } from "../Model/DTOs/NewTagToUserDTO";
import { TagEditInfoFromClientDTO } from "../Model/DTOs/TagEditInfoFromClientDTO";
import { TagSearchParams } from "../Model/DTOs/TagSearchParams";
import { UserFromClientDTO } from "../Model/DTOs/UserFromClientDTO";
import { Tag } from "../Model/models/tag";
import { JWTService } from "../Services/JWTService";

import { LogInUserCase, RegisterUserCase } from "../UseCases/AuthCases";
import { CreateTagCase, EditTagByCase, GetTagByIdCase, GetTagsCase } from "../UseCases/TagCases";

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

    app.get('/tag', CheckToken, (req: Request, res: Response) => {
        let params: TagSearchParams = req.query ? {
            sortByOrder: (req.query.sortByOrder !== null && req.query.sortByOrder !== undefined) ? true : false,
            SortByName: (req.query.sortByName !== null && req.query.sortByName !== undefined) ? true : false,
            offset: parseInt(req.query.offset as string),
            length: parseInt(req.query.length as string)
        } : {};

        GetTagsCase(params)
            .then((result: FullTagToUserDTO[]) => {
                res.json({
                    data: result,
                    meta: {
                        offset: params.offset,
                        lenght: params.length,
                        quantity: result.length
                    }
                });
            })
            .catch((err: Error) => {
                res.statusCode = 400;
                res.json({ message: err.message });
            })
    });

    app.put('/tag/:id', CheckToken, (req: Request, res: Response) => {
        let tagId: number = parseInt(req.params.id);
        //TODO: ??????????????????
        let params: TagEditInfoFromClientDTO = { name: req.body.name, sortOrder: req.body.sortOrder };
        EditTagByCase(params, tagId, (req as any).tokenData.data)
            .then((result: FullTagToUserDTO) => {
                res.json(result);
            })
            .catch((err: Error) => {
                res.statusCode = 400;
                res.json({ message: err.message });
            })
    });
}
