import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { sendRequest } from '@/app/utils/api';
import CardTrack from '@/components/Card';
import { Container } from '@mui/material';
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth';

// either Static metadata
export const metadata: Metadata = {
    title: 'LIke Page title',
    description: "mo ta like page"
}


const LikePage = async () => {
    const session = await getServerSession(authOptions);
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
        <Container sx={{ mt: "50px" }}>
            <CardTrack data={TrackLike?.data}></CardTrack>
        </Container>

    )
}
export default LikePage;