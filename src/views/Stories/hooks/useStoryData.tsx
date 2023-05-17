import StoryData from "../datas/StoryData";
import useData from "../../../hooks/useData";
import { Typography } from "@mui/material";
import { MyTableBodyProps } from "../../../components/MyTableBody/MyTableBody";
import { MyTableHeadProps } from "../../../components/MyTableHead/MyTableHead";
import { MyTableDatas } from "../../../components/MyTable/MyTable";
import { MyTableRowProps } from "../../../components/MyTableRow/MyTableRow";

const useStoryData = () : [boolean, MyTableDatas] => {
    const resourceName = 'stories';
    const tableHeadProps: MyTableHeadProps = {
        columnProps: [
            { columnName: 'Id' },
            { columnName: 'Titre' },
            { columnName: 'Créé à' },
            { columnName: 'Actions' }
        ]
    };

    const getTableBody = (datas: StoryData[]) : MyTableBodyProps => {
        const rowsProps: MyTableRowProps[] = datas.map<MyTableRowProps>(data => {
            return {
                dataId: data.id,
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
                hasLinkToDetails: false,
                resourcesName: resourceName
            }
        });

        return { rowsProps: rowsProps };
    };

    return useData<StoryData>( {tableHeadProps, getTableBody, resourceName: resourceName }  );
};

export default useStoryData;
