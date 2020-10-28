import { ExtendendRequest } from './utils';


export interface RequestWithUser extends ExtendendRequest {
    [user: string]: any;
}