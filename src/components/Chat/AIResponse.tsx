import Typography from "@mui/material/Typography";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from "@mui/material/Box";
import { useState } from "react";
import ResponseFeedback from "./ResponseFeedback";
import { ChatMessage } from "@/redux/chatSlice";

interface AIResponseProps {
	chatMsg: ChatMessage;
}

const AIResponse: React.FC<AIResponseProps> = ({ chatMsg }) => {
	const [hover, setHover] = useState<boolean>(false);

	const handleHover = () => {
		setHover((prev: boolean) => !prev)
	}

	return (
		<Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }} onMouseEnter={handleHover} onMouseLeave={handleHover}>
			<AccountCircleIcon sx={{ visibility: 'hidden' }} />
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<Typography variant="subtitle2">{chatMsg.content}</Typography>
				<ResponseFeedback responseId={chatMsg.id} show={hover} />
			</Box>
		</Box>
	)
}

export default AIResponse;