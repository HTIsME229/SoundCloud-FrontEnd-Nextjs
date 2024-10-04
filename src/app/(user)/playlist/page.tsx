import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sendRequest } from "@/app/utils/api"
import Playlist from "@/components/Playlist/playlist"
import { getServerSession } from "next-auth";


const PlaylistPage = async () => {
    const session = await getServerSession(authOptions);
    const res = await sendRequest<IBackendRes<IModelPaginate<IPlaylistByUser>>>(
        {

            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/playlists/by-user`,
            method: "Get",
            queryParams: {
                title: "",
                "page": 0,
                "size": 10,
            },
            headers: {
                Authorization: `Bearer ${session?.access_token}`,

            },
            nextOption: {
                next: { tags: ['uploadPlaylist',] }
            }

        }

    )




    return (
        <>
            <Playlist listPlaylist={res.data}  ></Playlist>
        </>
    )

}
export default PlaylistPage 