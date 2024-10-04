
import WaveTrack from "@/components/track/wavetrack"
import { Box, Container } from "@mui/material"
import { sendRequest } from "@/app/utils/api"
import Comment from "@/components/Comment/comment"
import { Session } from "inspector"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import slugify from "slugify"
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from "next/navigation"
import { promises } from "dns"
import { resolve } from "path"

export async function generateStaticParams() {
    return [
        { slug: "test-doi-ten-2.html" },
        { slug: "test-nhac-4.html" },
        { slug: "sdasdfa-5.html" }
    ]
}
type Props = {
    params: { slug: string }
}


export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const slug = params.slug
    let id = params.slug.substring(params.slug.indexOf("-") + 1, params.slug.indexOf("."));
    // fetch data
    const res = await sendRequest<IBackendRes<ITrack>>(
        {
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/tracks/${id}`,
            method: "Get",
            // nextOption: {
            //     cache: 'no-store',
            // }
        }
    )

    return {
        title: res?.data?.title,
        description: res?.data?.description,
        openGraph: {
            title: 'Hỏi Dân IT',
            description: 'Beyond Your Coding Skills',
            type: 'website',
            images: [`https://raw.githubusercontent.com/hoidanit/imageshosting/master/eric.png`],
        },

    }
}

const trackDetail = async ({ params }: any) => {

    const { slug } = params

    let id = slug.substring(slug.lastIndexOf("-") + 1, slug.indexOf("."));


    const session = await getServerSession(authOptions);

    const res = await sendRequest<IBackendRes<ITrack>>(
        {
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/tracks/${id}`,
            method: "Get",
            nextOption: {
                next: { tags: ['like-track',] }

            }

        }




    )

    if (!res.data) notFound()
    const comments = await sendRequest<IBackendRes<IModelPaginate<Comment>>>(
        {
            queryParams: {
                "page": 1,
                "size": 10,
                "trackId": id,
                "sort": "createAt,desc"
            },

            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/tracks/comments`,
            method: "get",



        }


    )

    const TrackLike = await sendRequest<IBackendRes<IModelPaginate<ITrack>>>(
        {
            queryParams: {
                "page": 1,
                "size": 10,
            },

            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/likes`,
            method: "get",
            headers: {
                Authorization: `Bearer ${session?.access_token}`,

            },
            nextOption: {
                next: { tags: ['like-track',] }

            }



        }
    )

    return (



        <Container sx={{ marginTop: "50px", }
        }>


            <WaveTrack TrackLike={TrackLike.data?.result} arrComments={comments?.data?.result} data={res?.data ?? null} ></WaveTrack>


        </Container >



    )
}
export default trackDetail;