import { useEffect, useState } from "react";
import { MyTableDatas } from "../components/MyTable/MyTable";
import { MyTableHeadProps } from "../components/MyTableHead/MyTableHead";
import CustomFetcher from "../utils/Fetcher";
import { MyTableBodyProps } from "../components/MyTableBody/MyTableBody";

export interface UseDataProps<T> {
    resourceName: string;
    filter?: string;
    tableHeadProps: MyTableHeadProps;
    getTableBody: (datas: T[]) => MyTableBodyProps;
}

const useData = <T, >({tableHeadProps, getTableBody, resourceName, filter}: UseDataProps<T>) : [boolean, MyTableDatas] => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [tableProps, setTableProps] = useState<MyTableDatas>({
        tableHeaderProps: tableHeadProps,
        tableBodyProps: {
            rowsProps: []
        }
    });

    useEffect(() => {
        const load = async () => {
            const fetcher = CustomFetcher.create();
            const getManyResponse = await fetcher.getManyAsync<T>(resourceName + filter);

            if (!getManyResponse.success) {
                setIsLoading(false);
            }
            
            const newTableProps: MyTableDatas = {
                tableHeaderProps: tableHeadProps,
                tableBodyProps: getTableBody(getManyResponse.datas!)
            }; 
            
            setIsLoading(false);
            setTableProps(newTableProps);
        };

        load();
    }, [filter])

    return [isLoading, tableProps];
};

export default useData;