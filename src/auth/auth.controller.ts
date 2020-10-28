import bcrypt from 'bcrypt';
import { Response, Request, Router } from 'express';
import { statusCodes } from '../utils/statusCodes';
import validationMiddleware from '../middleware/validation.middleware';
import CreateUserDto from '../users/user.dto';
import userModel from '../users/user.model';
import LoginDto from './login.dto';
import User from '../users/user.interface';
import { TokenData } from '../interfaces/tokenData.interface';
import { DataStoredInToken } from '../interfaces/dataStoredInToken.interface';
import * as jwt from 'jsonwebtoken';

class AuthController {
    public path = '/auth';
    public router = Router();
    private user = userModel;

    constructor() {
        this.initControllerRoutes();
    }

    private initControllerRoutes = () => {
        this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDto), this.registration);
        this.router.post(`${this.path}/login`, validationMiddleware(LoginDto), this.login);
        this.router.post(`${this.path}/logout`, this.logout);
    }
    /**
     * User registration.
     * /auth/register route
     * @param req - Express Request
     * @param res - Express Response
     */
    private registration = async (req: Request, res: Response): Promise<void> => {
        const userData: CreateUserDto = req.body;
        if (
            await this.user.findOne({ email: userData.email })
        ) {
            res.status(403).send({ statusCode: 403, statusMessage: "403 Already Exists", message: "Already Exists" });
        } else {
            const hash = await bcrypt.hash(userData.password, 10);
            const user = await this.user.create({
                ...userData,
                password: hash,
            });
            // No trace of password in the response
            user.password = '';
            const tokenData = this.createToken(user);
            res.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
            res.send(user);
        }
    }
    /**
     * User login.
     * /auth/login route.
     * Checks if the provided credentials are correct, otherwise returns response
     * with 403 status code.
     * @param req - Express Request
     * @param res - Express Response
     */
    private login = async (req: Request, res: Response): Promise<void> => {
        const loginData: LoginDto = req.body;
        const user = await this.user.findOne({ email: loginData.email });
        if (user) {
            const isPasswordMatching: boolean = await bcrypt.compare(loginData.password, user.password);
            if (isPasswordMatching) {
                // No trace of password in the response
                user.password = '';
                const tokenData = this.createToken(user);
                res.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
                res.send(user);
            } else {
                res.status(403).json(statusCodes[403]);
            }
        } else {
            res.status(403).json(statusCodes[403]);
        }
    }

    /**
     * Logout function.
     * /auth/logout route
     * Changes Authorization cookie to null
     * @param req - Express Request
     * @param res - Express Response
     */
    private logout = async (req: Request, res: Response): Promise<void> => {
        res.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
        res.send(200);
    }
    /**
     * Creates a jwt signed token.
     * @param user
     * @return TokenData
     */
    private createToken = (user: User): TokenData => {
        // 60s * 60m  => 1h
        const expiresIn = 60 * 60;
        const secret: string = process.env.JWT_SECRET!;
        const dataStoredInToken: DataStoredInToken = {
            _id: user._id,
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        }
    }

    /**
     * Creates a Authorization cookie. with JWT token
     * @param tokenData
     * @return string;
     */
    private createCookie(tokenData: TokenData): string {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }
}

export { AuthController };