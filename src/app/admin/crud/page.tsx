import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TableUser from "./components/table.user";
import { getServerSession } from "next-auth";
import { IUser, PUser } from "@/app/types/next-auth";
import { sendRequest } from "@/app/utils/api";

const CRUDPage = async ({ searchParams }: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    const session = await getServerSession(authOptions);

    const ACCESS_TOKEN = session?.access_token;
    const LIMIT = 5;
    const page = Number(searchParams?.page) || 1;




    const res = await sendRequest<IBackendRes<IModelPaginate<PUser>>>(
        {
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/users?page=${page}&size=${LIMIT}`,
            method: "get",
            headers: {
                'Authorization': `Bearer ${session?.access_token}`,
            },
            nextOption: {
                next: { tags: ['listUsers'] }

            }


        }

    )
    console.log(res)



    return (
        <div style={{ padding: "50px" }}>
            <TableUser
                raw={res?.data!}
                access_token={ACCESS_TOKEN}
            />
        </div>
    )
}
export default CRUDPage;