import NextAuth, { DefaultSession } from "next-auth"
interface IUser {
    id: number
    type: string
    username: string
    role: string
    isVerify: true
    email: string,
}
interface PUser {
    id: number,
    name: string,
    email: string,
    role: string
}
declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        access_token: string,
        refresh_token: string,
        access_expire: number,
        user: IUser
    }


}
import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {

        /** The user's postal address. */
        access_token: string,
        refresh_token: string,
        access_expire: number,
        user: IUser


    }
}