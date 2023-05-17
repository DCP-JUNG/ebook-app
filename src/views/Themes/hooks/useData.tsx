import { useEffect, useState } from "react";
import { MyTableDatas } from "../../../components/MyTable/MyTable";
import { MyTableHeadProps } from "../../../components/MyTableHead/MyTableHead";
import CustomFetcher from "../../../utils/Fetcher";
import ThemeData from "../datas/ThemeData";
import { MyTableBodyProps } from "../../../components/MyTableBody/MyTableBody";
import { Typography } from "@mui/material";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ClearIcon from '@mui/icons-material/Clear';

const useData = () : [boolean, MyTableDatas] => {
    const resourceName = "themes";
    const tableHeaderProps: MyTableHeadProps = {
        columnProps: [
            { columnName: 'Id' },
            { columnName: 'Nom' },
            { columnName: 'Description' },
            { columnName: 'Est interdit' },
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
            const getManyResponse = await fetcher.getManyAsync<ThemeData>(resourceName);

            if (!getManyResponse.success) {
                setIsLoading(false);
            }
            
            const tableBodyProps: MyTableBodyProps = {
                rowsProps: getManyResponse.datas!.map(data => { return {
                    cellProps: [
                        { 
                            props: {  component: "th", scope: "row" },
                            children: <Typography variant="body1">{data.name}</Typography>
                        },
                        { 
                            props: {  component: "th", scope: "row" },
                            children: <Typography variant="body1">{data.description}</Typography>
                        },
                        { 
                            props: {  component: "th", scope: "row" },
                            children: <Typography variant="body1">{ data.isForbidden ? <DoneOutlineIcon color="success" /> : <ClearIcon color="error" />}</Typography>
                        },
                        { 
                            props: {  component: "th", scope: "row"},
                            children: <Typography variant="body1">{data.createdAt.toLocaleString()}</Typography>
                        }
                    ],
                    dataId: data.id,
                    resourcesName: resourceName,
                    hasLinkToDetails: false
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
