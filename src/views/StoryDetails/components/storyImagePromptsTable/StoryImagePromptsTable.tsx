import { Paper, Table, TableBody, TableContainer, TableHead } from '@mui/material';
import tableRows, { tableColumns } from './StoriesImagePromptColumns';
import StoryImagePromptData from '../../../Stories/datas/StoryImagePrompt';

interface StoryImagePromptsTableProps {
    storyImagePrompts: StoryImagePromptData[];
};

const StoryImagePromptsTable = ({storyImagePrompts}: StoryImagePromptsTableProps) => {
    const rows = tableRows(storyImagePrompts);
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