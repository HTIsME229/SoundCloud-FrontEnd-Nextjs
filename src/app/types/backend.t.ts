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
            pages: number;
            total: number;
        },
        result: T[]
    }
    interface ITrack {
        "id": number,
        "title": string,
        "description": string,
        "url": string,
        "imgUrl": string,
        "category": string
    }

}
