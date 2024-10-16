import { sendRequest } from "@/app/utils/api";
import nextAuth, { AuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import dayjs from "dayjs";
import { JWT } from "next-auth/jwt";
import { error } from "console";
async function refreshAccessToken(token: JWT) {
    const res = await sendRequest<IBackendRes<IAuth>>(
        {
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/auth/refresh`,
            method: "Post",
            body: {
                refresh_token: token.refresh_token
            }

        }

    )
    // console.log(res.data)
    token.refresh_token
    if (res.data) {
        return {
            ...token,
            access_token: res.data.access_token,
            refresh_token: res.data.refresh_token,
            access_expire: dayjs(new Date()).add(
                +(process.env.TOKEN_EXPIRE_NUMBER as string), (process.env.TOKEN_EXPIRE_UNIT as any)
            ).unix(),
            error: ""

        }
    }
    else {
        return {
            ...token,
            error: "RefreshTokenError"
        }

    }

}
export const authOptions: AuthOptions = {

    secret: process.env.NEXTAUTH_SECRET!,
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        GoogleProvider({
            clientId: process?.env?.GOOGLE_ID!,
            clientSecret: process?.env?.GOOGLE_SECRET!
        }),

        CredentialsProvider({

            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const res = await sendRequest<IBackendRes<IAuth>>(
                    {
                        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/auth/login`,
                        method: "Post",
                        body: {
                            username: credentials?.username,
                            password: credentials?.password
                        }

                    }

                )

                if (res.data) {
                    // Any object returned will be saved in `user` property of the JWT
                    return res.data as any
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account, profile, trigger }) {

            if (trigger == "signIn" && account?.provider !== "credentials") {

                const res = await sendRequest<IBackendRes<IAuth>>(
                    {
                        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/auth/social-media`,
                        method: "Post",
                        body: {
                            type: account?.provider,
                            username: `${user.email}-${account?.provider}`


                        }
                    }
                )

                if (res.data) {
                    token.access_token = res.data.access_token
                    token.refresh_token = res.data.refresh_token,

                        token.access_expire = dayjs(new Date()).add(
                            +(process.env.TOKEN_EXPIRE_NUMBER as string), (process.env.TOKEN_EXPIRE_UNIT as any)
                        ).unix(),
                        token.user = res.data.user
                }


            }
            if (trigger == "signIn" && account?.provider === "credentials") {
                // @ts-ignore
                token.access_token = user.access_token
                // @ts-ignore
                token.refresh_token = user.refresh_token
                // @ts-ignore
                token.user = user.user,

                    token.access_expire = dayjs(new Date()).add(
                        +(process.env.TOKEN_EXPIRE_NUMBER as string), (process.env.TOKEN_EXPIRE_UNIT as any)
                    ).unix()
            }

            const isExpired = dayjs().isAfter(dayjs.unix(token.access_expire)); // Nếu access_expire là timestamp

            if (isExpired) {
                console.log("Token has expired, refreshing...");

                return refreshAccessToken(token);
            }
            return token;

        },
        session({ token, user, session }) {
            session.access_token = token.access_token
            session.refresh_token = token.refresh_token
            session.user = token.user,
                session.access_expire = token.access_expire
            return session
        },
        async redirect({ url, baseUrl }) {
            // Chuyển hướng đến trang chủ sau khi đăng nhập thành công
            return baseUrl;
        },

    },
    pages: {
        signIn: '/auth/signin',

    }
}
const handler = nextAuth(authOptions)

export { handler as GET, handler as POST }
