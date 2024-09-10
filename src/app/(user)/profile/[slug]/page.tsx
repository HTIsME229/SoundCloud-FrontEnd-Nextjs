import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sendRequest } from "@/app/utils/api"
import CardTrack from "@/components/Card";
import { Container } from "@mui/material";
import { getServerSession } from "next-auth";

const ProfilePage = async ({ params }: { params: { slug: string } }) => {

    const res = await sendRequest<IBackendRes<IModelPaginate<ITrack>>>(
        {

            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/tracks/users`,
            method: "post",
            body: {
                id: params.slug
            },
            queryParams: {
                page: "1",
                size: '10'
            },
            nextOption: {
                cache: 'no-store',
            }


        }

    )

    return (
        <div>
            <Container sx={{ mt: "50px" }}>
                <CardTrack data={res.data}></CardTrack>
            </Container>
        </div>
    )

}
export default ProfilePage 