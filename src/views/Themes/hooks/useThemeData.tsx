import { MyTableDatas } from "../../../components/MyTable/MyTable";
import { MyTableHeadProps } from "../../../components/MyTableHead/MyTableHead";
import ThemeData from "../datas/ThemeData";
import { MyTableBodyProps } from "../../../components/MyTableBody/MyTableBody";
import { Typography } from "@mui/material";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ClearIcon from '@mui/icons-material/Clear';
import { MyTableRowProps } from "../../../components/MyTableRow/MyTableRow";
import useData from "../../../hooks/useData";

const useThemeData = (filter: string = '') : [boolean, MyTableDatas] => {
    const resourceName = "themes";
    const tableHeadProps: MyTableHeadProps = {
        columnProps: [
            { columnName: 'Id' },
            { columnName: 'Nom' },
            { columnName: 'Description' },
            { columnName: 'Est interdit' },
            { columnName: 'Créé à' },
            { columnName: 'Actions' }
        ]
    };

    const getTableBody = (datas: ThemeData[]) : MyTableBodyProps => {
        const rowsProps: MyTableRowProps[] = datas.map<MyTableRowProps>(data => {
            return {
                dataId: data.id,
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
                        children: <Typography variant="body1">{ data.isForbidden ? <ClearIcon color="error" /> : <DoneOutlineIcon color="success" /> }</Typography>
                    },
                    { 
                        props: {  component: "th", scope: "row"},
                        children: <Typography variant="body1">{data.createdAt.toLocaleString()}</Typography>
                    }
                ],
                hasLinkToDetails: false,
                resourcesName: resourceName
            }
        });

        return { rowsProps: rowsProps };
    };

    return useData<ThemeData>( {tableHeadProps, getTableBody, resourceName: resourceName, filter: filter }  );
};

export default useThemeData;
