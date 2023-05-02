import { TableCell, TableRow } from "@mui/material";
import StyledTableRow from "./StyledTableRow";
import CustomFetcher, { FetchManyResult } from "../../../../utils/Fetcher";

export interface StoryData {
    id: string;
    title: string;
    body: string;
    createdAt: Date;
};

export const tableColumns = 
    <TableRow>
        <TableCell align="left">Id</TableCell>
        <TableCell align="left">Titre</TableCell>
        <TableCell align="left">Créé à</TableCell>
    </TableRow>;

export const tableRows = (datas: StoryData[]) => {
    return datas.map(data =>     
        <StyledTableRow key={data.id}>
            <TableCell component="th" scope="row">{data.id}</TableCell>
            <TableCell component="th" scope="row">{data.title}</TableCell>
            <TableCell component="th" scope="row">{data.createdAt.getTimezoneOffset()}</TableCell>
        </StyledTableRow>
    )
};

const getDatas = async () : Promise<FetchManyResult<StoryData>> => {
    const fetcher = CustomFetcher.create();
    return await fetcher.getManyAsync<StoryData>("stories");
};

export default getDatas;
  