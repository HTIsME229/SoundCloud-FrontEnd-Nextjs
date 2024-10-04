import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sendRequest } from "@/app/utils/api"
import ShowList from "@/components/Search/ShowList";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";


const SearchPage = async ({
    params,
    searchParams,
}: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) => {

    const session = await getServerSession(authOptions);

    const res = await sendRequest<IBackendRes<IModelPaginate<ITrack>>>(
        {

            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/tracks`,
            method: "get",
            queryParams: {
                title: searchParams.q,
                page: 1,
                size: 5
            },
            headers: {
                Authorization: `Bearer ${session?.access_token}`,

            }


        }

    )

    return (
        <>

            <ShowList data={res?.data}></ShowList>
        </>
    )
}
export default SearchPage