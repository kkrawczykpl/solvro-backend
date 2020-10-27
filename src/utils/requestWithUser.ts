import { Request } from 'express';
import User from '../users/user.interface';
import { ExtendendRequest } from './utils';


export interface RequestWithUser extends ExtendendRequest {
    [user: string]: any;
}