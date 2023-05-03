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
}

export default CustomFetcher;