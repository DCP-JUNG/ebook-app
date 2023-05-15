import NotFound from "../views/NotFound/NotFound";

let instance: CustomFetcher; 

export interface FetchManyResult<T> {
    datas?: T[],
    success: boolean,
    errorPage?: JSX.Element;
}

export interface FetchOneResult<T> {
    data?: T,
    success: boolean,
    errorPage?: JSX.Element;
}

export interface PostResult<T> {
    data?: T,
    success: boolean,
    errorMessage?: string;
    location?: string;
}

export interface DeleteOneResult {
    success: boolean,
    errorPage?: JSX.Element;
}

class CustomFetcher {
    static #isInternalConstructing = false;
    #baseUrl : string;

    constructor() {
        if (!CustomFetcher.#isInternalConstructing) {
            throw new TypeError("Fetcher is not constructable");
        }

        CustomFetcher.#isInternalConstructing = false;
        instance = this;
        this.#baseUrl = 'https://localhost:7270';
    }

    static create() {
        CustomFetcher.#isInternalConstructing = true;
        return new CustomFetcher();
    }

    getManyAsync = async <T, >(resource : string) : Promise<FetchManyResult<T>> => {
        try {
            const response = await fetch(this.#baseUrl + "/" + resource);
            if (!response.ok) {
                return {
                    success: false,
                    errorPage: <NotFound />
                };
            }

            const datas = await response.json() as T[];
            return {
                datas: datas,
                success: true
            };
        }
        catch (error){
            return {
                success: false,
                errorPage: <NotFound />
            };
        }
    };

    getOneAsync = async<T, >(resource: string): Promise<FetchOneResult<T>> => {
        try {
            const response = await fetch(this.#baseUrl + "/" + resource);
            if (!response.ok) {
                return {
                    success: false,
                    errorPage: <NotFound />
                };
            }

            const data = await response.json() as T;
            return {
                data: data,
                success: true
            };
        }
        catch (error){
            return {
                success: false,
                errorPage: <NotFound />
            };
        }
    };

    postAsync = async<TBody, >(resource: string, body: TBody) : Promise<PostResult<TBody>> => {
        try {

            const headers: HeadersInit = new Headers();
            headers.append('Content-Type', 'application/json');

            const requestInit: RequestInit = {
                method: 'POST',
                body: JSON.stringify(body),
                headers: headers
            };

            const response = await fetch(this.#baseUrl + "/" + resource, requestInit);
            if (!response.ok) {

                const errorMessage = await response.json() as string;

                return {
                    success: false,
                    errorMessage: errorMessage
                };
            }

            return {
                success: true,
                location: response.headers.get("location") ?? '',
            }
        }
        catch (error){
            const message = error instanceof Error ?  error.message : String(error);
            return {
                success: false,
                errorMessage: message
            };
        }
    };

    postWithResponseBodyAsync = async<TBody, TResponseBody>(resource: string, body: TBody, hasBodyResponse: boolean = false) : Promise<PostResult<TResponseBody>> => {
        try {

            const headers: HeadersInit = new Headers();
            headers.append('Content-Type', 'application/json');

            const requestInit: RequestInit = {
                method: 'POST',
                body: JSON.stringify(body),
                headers: headers
            };

            const response = await fetch(this.#baseUrl + "/" + resource, requestInit);
            if (!response.ok) {

                const errorMessage = await response.json() as string;

                return {
                    success: false,
                    errorMessage: errorMessage
                };
            }

            const data = hasBodyResponse ? await response.json() as TResponseBody : undefined;
            return {
                success: true,
                location: response.headers.get("location") ?? '',
                data: data
            }
        }
        catch (error){
            const message = error instanceof Error ?  error.message : String(error);
            return {
                success: false,
                errorMessage: message
            };
        }
    };

    deleteOneAsync = async (resource: string, id: string) : Promise<DeleteOneResult> => {
        try {

            const requestInit: RequestInit = {
                method: 'DELETE',
            };

            const response = await fetch(this.#baseUrl + "/" + resource + `/${id}`, requestInit);
            if (!response.ok) {
                return {
                    success: false,
                    errorPage: <NotFound />
                };
            }

            return {
                success: true
            };
        }
        catch (error){
            return {
                success: false,
                errorPage: <NotFound />
            };
        }
    }
}

export default CustomFetcher;