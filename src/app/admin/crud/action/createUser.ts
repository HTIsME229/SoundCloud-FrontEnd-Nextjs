"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { IUser } from "@/app/types/next-auth";
import { sendRequest } from "@/app/utils/api";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";

export async function createUser(values: any) {
    const { name, email, password, age, gender, role, address } = values;
    const session = await getServerSession(authOptions);
    const data = { name, email, password, age, gender, role, address };
    const res = await sendRequest<IBackendRes<IUser>>(
        {
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/users`,
            method: "Post",
            headers: {
                'Authorization': `Bearer ${session?.access_token}`,
            },
            body: {
                name,
                email,
                password,
                age,
                gender,
                role,
                address
            }

        }

    )
    if (res.data) {
        revalidateTag("listUsers")
    }
    return res


}
export async function updateUser(values: any) {
    const { id, name, email, age, gender, role, address } = values;
    const session = await getServerSession(authOptions);
    const data = { id, name, email, age, gender, role, address };
    const res = await sendRequest<IBackendRes<IUser>>(
        {
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/users`,
            method: "put",
            headers: {
                'Authorization': `Bearer ${session?.access_token}`,
            },
            body: data

        }

    )
    if (res.data) {
        revalidateTag("listUsers")
    }
    return res


}
export async function deleteUser(values: any) {
    const { id } = values;
    const session = await getServerSession(authOptions);

    const res = await sendRequest<number>(
        {
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/users/${id}`,
            method: "delete",
            headers: {
                'Authorization': `Bearer ${session?.access_token}`,
                "content-type": "text/html"
            },


        }

    )

    if (res == 204) {
        revalidateTag("listUsers")
    }
    return res


}
