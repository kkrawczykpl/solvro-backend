import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { statusCodes } from '../utils/statusCodes';
import { DataStoredInToken } from "../interfaces/dataStoredInToken.interface";
import userModel from "../users/user.model";
import { RequestWithUser } from '../utils/requestWithUser';

/**
 * Middleware that checks the JWT token that user sends.
 * If token is verifed and user exists the function appends
 * the user data to the request object.
 * @param req - Express Request
 * @param res - Express Response
 * @param next - Express NextFunction
 */
const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const cookies = req.cookies;
    if(cookies && cookies.Authorization) {
        const secret: string = process.env.JWT_SECRET!;
        try {
            const verificationRes = jwt.verify(cookies.Authorization, secret) as DataStoredInToken;
            const id: string = verificationRes._id;
            const user = await userModel.findById(id);
            if(user) {
                req.user = user;
                next();
            }else{
                res.status(401).json( statusCodes[401] );
            }
        } catch (error) {
            res.status(401).json( statusCodes[401] );
        }
    }else{
        res.status(401).json( statusCodes[401] );
    }
}

export { authMiddleware };