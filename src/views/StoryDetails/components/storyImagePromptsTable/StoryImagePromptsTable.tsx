import { Paper, Table, TableBody, TableContainer, TableHead } from '@mui/material';
import getDatas, { tableColumns, tableRows } from './StoriesColumns';
import { useEffect, useState } from 'react';

const StoryImagePromptsTable = () => {
    const [rows, setRows] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const loadDatas = async () => {

            const fetchManyResult = await getDatas();
            if (fetchManyResult.success) {
                const localRows = tableRows(fetchManyResult.datas!);
                setRows(localRows);
            }
        }

        loadDatas();
    }, []);

    return (
        <TableContainer component={Paper} sx={{ mt: '10px'}} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>{tableColumns}</TableHead>
                <TableBody>{rows}</TableBody>
            </Table>
        </TableContainer>
    );
};

export default StoryImagePromptsTable;