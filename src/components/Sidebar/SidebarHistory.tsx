import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { RootState } from '@/redux/store';
import { Typography } from '@mui/material';
import { getUniqueTitles } from '@/config/utils';
import { ChatMessage } from '@/redux/chatSlice';

interface HistoryProps {
	chatHistory: string[] | null;
	handleHistory: (title: string) => void;
}

const History: React.FC<HistoryProps> = ({ chatHistory, handleHistory }) => {
	const handleItemClick = useCallback(
		(message: string) => () => handleHistory(message),
		[handleHistory]
	);
	return (
		<List>
			{chatHistory?.map((message, idx) => (
				<ListItem key={`${message}_${idx}`} disablePadding>
					<ListItemButton onClick={handleItemClick(message)}>
						<ListItemText primary={message} />
					</ListItemButton>
				</ListItem>
			))}
		</List>
	);
}

interface SidebarHistoryProp {
	backToHistoryPrompt: (title: string) => void;
}

const SidebarHistory: React.FC<SidebarHistoryProp> = ({ backToHistoryPrompt }) => {

	const {
		previousChats,
		localChats,
	} = useSelector((state: RootState) => state.chat);

	const uniqueTitles = getUniqueTitles(previousChats, (chat: ChatMessage) => chat.title);
	const localUniqueTitles = getUniqueTitles(localChats, (chat: ChatMessage) => chat.title).filter(
		(title) => !uniqueTitles.includes(title)
	);
	return (
		<Box padding={2}>
			{uniqueTitles.length > 0 && previousChats.length !== 0 && (
				<>
					<Typography variant='h6'>Ongoing</Typography>
					<History chatHistory={uniqueTitles} handleHistory={backToHistoryPrompt} />
				</>
			)}
			{localUniqueTitles.length > 0 && localChats.length !== 0 && (
				<>
					<Typography variant='h6'>Previous</Typography>
					<History chatHistory={localUniqueTitles} handleHistory={backToHistoryPrompt} />
				</>
			)}
		</Box>
	)
}

export default SidebarHistory;