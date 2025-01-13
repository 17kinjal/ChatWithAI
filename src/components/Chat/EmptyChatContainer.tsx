
import Box from '@mui/material/Box'
import { useSelector } from "react-redux";
import Typography from '@mui/material/Typography';
import { RootState } from "@/redux/store";

const EmptyChatContainer = () => {
	const {
		currentTitle,
	} = useSelector((state: RootState) => state.chat);
	return (
		!currentTitle && (
			<Box component="section" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
				<img
					src='images/chatgpt-logo.svg'
					width={45}
					height={45}
					alt='ChatGPT'
				/>
				<Typography variant='h3'>How can I help you today?</Typography>
			</Box>
		)
	)
}

export default EmptyChatContainer;