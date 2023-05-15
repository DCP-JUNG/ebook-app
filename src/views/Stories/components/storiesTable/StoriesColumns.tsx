import { IconButton, TableCell, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import StyledTableRow from "../../../../components/StyledTableRow/StyledTableRow";
import CustomFetcher, { FetchManyResult } from "../../../../utils/Fetcher";
import StoryData from "../../datas/StoryData";
import DeleteIcon from '@mui/icons-material/Delete';

export const tableColumns = 
    <TableRow>
        <TableCell align="left">Id</TableCell>
        <TableCell align="left">Titre</TableCell>
        <TableCell align="left">Créé à</TableCell>
        <TableCell align="left">Actions</TableCell>
    </TableRow>;
    

export const tableRows = (datas: StoryData[], onDelete: (id: string) => void) => {
    return datas.map(data =>     
        <StyledTableRow key={data.id}>
            <TableCell component="th" scope="row">
                <Link to={`${data.id}`}>{data.id}</Link>
            </TableCell>
            <TableCell component="th" scope="row">{data.title}</TableCell>
            <TableCell component="th" scope="row">{data.createdAt.toLocaleString()}</TableCell>
            <TableCell component="th" scope="row">{
                <IconButton aria-label="delete" onClick={() => onDelete(data.id)}>
                    <DeleteIcon />
                </ IconButton>}</TableCell>
        </StyledTableRow>
    )
};

const getDatas = async () : Promise<FetchManyResult<StoryData>> => {
    const fetcher = CustomFetcher.create();
    return await fetcher.getManyAsync<StoryData>("stories");
};

export default getDatas;
  