import { TableCell, TableRow } from "@mui/material";
import StyledTableRow from "../../../../components/StyledTableRow/StyledTableRow";
import StoryImagePromptData from "../../../Stories/datas/StoryImagePrompt";

export const tableColumns = 
    <TableRow>
        <TableCell align="left">Prompt</TableCell>
    </TableRow>;

export const tableRows = (datas: StoryImagePromptData[]) => {
    return datas.map(data =>     
        <StyledTableRow key={data.id}>
            <TableCell component="th" scope="row">{data.prompt}</TableCell>
        </StyledTableRow>
    )
};

export default tableRows;
  