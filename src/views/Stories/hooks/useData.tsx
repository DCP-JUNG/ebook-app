import { Typography } from "@mui/material";
import { MyTableBodyProps } from "../../../components/MyTableBody/MyTableBody";
import { MyTableHeadProps } from "../../../components/MyTableHead/MyTableHead";
import StoryData from "../datas/StoryData";
import CustomFetcher from "../../../utils/Fetcher";
import { useEffect, useState } from "react";
import { MyTableDatas } from "../../../components/MyTable/MyTable";

const useData = () : [boolean, MyTableDatas] => {

    const resourceName = 'stories';
    const tableHeaderProps: MyTableHeadProps = {
        columnProps: [
            { columnName: 'Id' },
            { columnName: 'Titre' },
            { columnName: 'Créé à' },
            { columnName: 'Actions' }
        ]
    };

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [tableProps, setTableProps] = useState<MyTableDatas>({
        tableHeaderProps: tableHeaderProps,
        tableBodyProps: {
            rowsProps: []
        }
    });

    useEffect(() => {
        const load = async () => {

            if (!isLoading) {
                return;
            }

            const fetcher = CustomFetcher.create();
            const getManyResponse = await fetcher.getManyAsync<StoryData>(resourceName);

            if (!getManyResponse.success) {
                setIsLoading(false);
            }
            
            const tableBodyProps: MyTableBodyProps = {
                rowsProps: getManyResponse.datas!.map(data => { return {
                    cellProps: [
                        { 
                            props: {  component: "th", scope: "row" },
                            children: <Typography variant="body1">{data.title}</Typography>
                        },
                        { 
                            props: {  component: "th", scope: "row"},
                            children: <Typography variant="body1">{data.createdAt.toLocaleString()}</Typography>
                        }
                    ],
                    dataId: data.id,
                    resourcesName: resourceName,
                    hasLinkToDetails: true
                } })
            };

            const newTableProps: MyTableDatas = {
                tableHeaderProps: tableHeaderProps,
                tableBodyProps: tableBodyProps
            }; 
            
            setIsLoading(false);
            setTableProps(newTableProps);
        };

        load();
    }, [])

    return [isLoading, tableProps];
};

export default useData;
