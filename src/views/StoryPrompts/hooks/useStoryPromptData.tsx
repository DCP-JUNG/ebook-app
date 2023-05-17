import StoryPromptData from "../data/StoryPromptData";
import useData from "../../../hooks/useData";
import { MyTableDatas } from "../../../components/MyTable/MyTable";
import { MyTableHeadProps } from "../../../components/MyTableHead/MyTableHead";
import { MyTableBodyProps } from "../../../components/MyTableBody/MyTableBody";
import { Typography } from "@mui/material";
import { MyTableRowProps } from "../../../components/MyTableRow/MyTableRow";

const useStoryPromptData = () : [boolean, MyTableDatas] => {
    const resourceName = 'story-prompts';
    const tableHeadProps: MyTableHeadProps = {
        columnProps: [
            { columnName: 'Id' },
            { columnName: 'Nom' },
            { columnName: 'Description' },
            { columnName: 'Prompt' },
            { columnName: 'Actions' }
        ]
    };

    const getTableBody = (datas: StoryPromptData[]) : MyTableBodyProps => {
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
                        children: <Typography variant="body1">{data.prompt}</Typography>
                    }
                ],
                hasLinkToDetails: false,
                resourcesName: resourceName
            }
        });

        return { rowsProps: rowsProps };
    };

    return useData<StoryPromptData>( {tableHeadProps, getTableBody, resourceName: resourceName }  );
};

export default useStoryPromptData;
