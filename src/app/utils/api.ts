import queryString from 'query-string';
import { json } from 'stream/consumers';

export const sendRequest = async <T>(props: IRequest) => {
    let {
        url,
        method,
        body,
        queryParams = null,
        useCredentials = false,
        headers = {},
        nextOption = {}
    } = props;

    const options: any = {
        method: method,
        // by default setting the content-type to be json type
        headers: new Headers({ 'content-type': 'application/json', ...headers }),
        body: body ? JSON.stringify(body) : null,

        ...nextOption
    };
    if (useCredentials) options.credentials = "include";

    if (queryParams != null) {

        url = `${url}?${queryString.stringify(queryParams)}`;

    }

    return fetch(url, options).then(res => {
        if (res.ok) {
            console.log("check url", url)

            return res.json() as T;

        } else {
            return res.json().then(function (json) {
                // to be able to access error status when you catch the error 
                return {
                    statusCode: res.status,
                    message: json?.message ?? "",
                    error: json?.error ?? ""
                } as T;
            });
        }
    });
};
export const sendRequestFile = async <T>(props: IRequest) => {
    let {
        url,
        method,
        body,
        queryParams = {},
        useCredentials = false,
        headers = {},
        nextOption = {}

    } = props;


    const options: any = {
        method: method,
        // by default setting the content-type to be json type
        headers: new Headers({ ...headers }),

        body: body,
        ...nextOption
    };
    if (useCredentials) options.credentials = "include";

    if (queryParams != null) {

        url = `${url}?${queryString.stringify(queryParams)}`;

    }

    return fetch(url, options).then(res => {
        if (res.ok) {


            return res.json() as T;

        } else {
            return res.json().then(function (json) {
                // to be able to access error status when you catch the error 
                return {
                    statusCode: res.status,
                    message: json?.message ?? "",
                    error: json?.error ?? ""
                } as T;
            });
        }
    });
};
export const fetchDefaultImage = (TYPE: string) => {

    if (TYPE.toLowerCase() === "github") return "/user/default-github.png"
    if (TYPE.toLowerCase() == "google") return "/user/default-google.png"
    return "/user/default-user.png"


}
export const num2time = (seconds: number) => {

    // Lấy số giờ
    const hours = Math.floor(seconds / 3600);
    // Lấy số phút
    const minutes = Math.floor((seconds % 3600) / 60);
    // Lấy số giây còn lại
    const secs = Math.floor(seconds % 60);

    // Định dạng với 2 chữ số (nếu số nhỏ hơn 10)
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = secs.toString().padStart(2, '0');

    if (hours > 0) {
        const formattedHours = hours.toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    } else {
        return `${formattedMinutes}:${formattedSeconds}`;
    }
}
