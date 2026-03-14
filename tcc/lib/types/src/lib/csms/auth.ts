import { UserType } from "../db";

export type AuthCsmsFunctionBody = {
    userId: string;
    userName: string;
    userEmail?: string;
    userType?: UserType;
    token: string;
    expiresAt: Date;
}