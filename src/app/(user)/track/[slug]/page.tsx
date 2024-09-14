
import WaveTrack from "@/components/track/wavetrack"
import { Box, Container } from "@mui/material"
import { sendRequest } from "@/app/utils/api"
import Comment from "@/components/Comment/comment"
const trackDetail = async (props: any) => {

    const { params } = props



    const res = await sendRequest<IBackendRes<ITrack>>(
        {
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/tracks/${params.slug}`,
            method: "Get",
            nextOption: {
                cache: 'no-store',
            }
        }


    )
    const comments = await sendRequest<IBackendRes<IModelPaginate<Comment>>>(
        {
            queryParams: {
                "page": 1,
                "size": 10,
                "trackId": params.slug,
                "sort": "createAt,desc"
            },

            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/tracks/comments`,
            method: "get",
            nextOption: {
                cache: 'no-store',

            }


        }

    )

    return (



        <Container sx={{ marginTop: "50px", }
        }>


            <WaveTrack arrComments={comments?.data?.result} data={res?.data ?? null} ></WaveTrack>


        </Container >



    )
}
export default trackDetail;