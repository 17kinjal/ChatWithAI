import { useMemo } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import UserQuery from "./UserQuery";
import AIResponse from "./AIResponse";

interface ChatHeaderProps {
	scrollToLastItem: React.RefObject<HTMLLIElement>;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ scrollToLastItem }) => {
	const {
		localChats,
		previousChats,
		currentTitle
	} = useSelector((state: RootState) => state.chat);

	const currentChat = useMemo(() => (localChats || previousChats).filter(
		(prevChat) => prevChat.title === currentTitle
	), [localChats, previousChats, currentTitle]);

	return (
		<Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', gap: '1rem', paddingBottom: '1rem', overflow: 'auto', marginBottom: 'auto' }}>
			<List>
				{currentChat?.map((chatMsg, idx) => (
					<ListItem key={idx} ref={scrollToLastItem} sx={{ alignItems: 'center', gap: '8px' }}>
						{chatMsg?.role === 'user' ?
							<UserQuery chatMsg={chatMsg.content} />
							:
							<AIResponse chatMsg={chatMsg} />
						}
					</ListItem>
				))}
			</List>
		</Box>
	)
}

export default ChatHeader;