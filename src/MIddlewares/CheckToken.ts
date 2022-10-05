import { Response, Request, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { JWTService } from "../Services/JWTService";

export const CheckToken = (req: Request, res: Response, next: NextFunction) => {
    const header: string = req.headers["authorization"] as string;
    if (header) {
        const parts: string[] = header.split(' ');
        const tokenItself: string = parts[1];

        let tokenData: any = JWTService.CheckToken(tokenItself);
        if (tokenData) {
            //FIXME: Игнорирование typescript для переноса данных токена далее.
            (req as any).token = tokenItself;
            (req as any).tokenData = tokenData;
            next();
        }
        else {
            res.sendStatus(403);
        }
    }
    else {
        res.sendStatus(403);
    }
}