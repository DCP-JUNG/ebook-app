import { StoryData } from "../views/Stories/components/storiesTable/StoriesColumns";

let instance: CustomFetcher; 

export interface FetchManyResult<T> {
    datas?: T[],
    success: boolean,
    errorMessage?: JSX.Element;
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
        this.#baseUrl = 'http://localhost:5080';
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
                    errorMessage: <p>Error</p>
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
                errorMessage: <p>Error</p>
            };
        }
    };
}

export default CustomFetcher;