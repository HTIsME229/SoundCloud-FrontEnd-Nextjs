export { };
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
    interface IRequest {
        url: string;
        method: string;
        body?: { [key: string]: any };
        queryParams?: any;
        useCredentials?: boolean;
        headers?: any;
        nextOption?: any;
    }

    interface IBackendRes<T> {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        data?: T;
    }
    interface IPlaylist {
        id: number,
        title: string,
        isPublic: boolean,
        user: {
            id: number
            type: string
            username: string
            role: string
            isVerify: true
            email: string,
            address: string,
            age: number,
            verify: boolean
        }

    }
    interface IPlaylistByUser extends IPlaylist {
        tracks: ITrack[]
    }

    interface IAuth {
        access_token: string,
        refresh_token: string
        user: {
            id: number
            type: string
            username: string
            role: string
            isVerify: true
            email: string,
        }
    }

    interface IModelPaginate<T> {
        meta: {
            current: number;
            pageSize: number;
            totalsPage: number;
            totalsItems: number;
        },
        result: T[]
    }
    interface ITrack {
        id: number,
        title: string,
        description: string,
        url: string,
        imgUrl: string,
        category: string,
        countPlay: number,
        countLike: number
    }
    interface INewTrack {
        title: string,
        description: string,
        url: string,
        imgUrl: string,
        category: string,

    }
    interface ITrackContext {
        currentTrack: IShareTrack,
        setCurrentTrack: (v: IShareTrack) => void
    }
    interface IShareTrack extends ITrack {
        isPlaying: boolean
        currentTime: number
        wavesurfer: boolean
    }
    interface Comment {
        id: number,
        content: string,
        moment: number,
        create_at: string,
        update_at: string,
        user: {
            id: number,
            email: string,
            name: string,
            role: string,
            type: string
        },
        track: {
            id: number,
            title: string,
            description: string,
            url: string
        },
        deleted: boolean
    }

}
