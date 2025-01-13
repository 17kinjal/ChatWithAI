import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';
import IconButton from "@mui/material/IconButton";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface ChatBottomProp {
	submitHandler: (text: string) => Promise<any>;
}

const ChatBottom: React.FC<ChatBottomProp> = ({ submitHandler }) => {
	const {
		errorText,
		isResponseLoading
	} = useSelector((state: RootState) => state.chat);

	const [text, setText] = useState<string>('');
	
	const onSubmit = async (e: any) => {
		e.preventDefault();
		if (!text) return;
		await submitHandler(text)
		setText('')
	}

	return (
		<Box component="section" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
			{errorText && <p className='errorText'>{errorText}</p>}
			{errorText && (
				<p id='errorTextHint'>
					*You can clone the repository and use your paid OpenAI API key
					to make this work.
				</p>
			)}
			<form onSubmit={onSubmit} style={{ width: '100%' }}>
				<TextField
					label="Send a message"
					id="outlined-start-adornment"
					sx={{ width: '100%' }}
					slotProps={{
						input: {
							endAdornment: !isResponseLoading && <InputAdornment position="end">
								<IconButton type="submit">
									<SendIcon />
								</IconButton>
							</InputAdornment>,
						},
					}}
					value={isResponseLoading ? 'Processing...' : text}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						setText(event.target.value);
					}}
				/>
			</form>
		</Box>
	)
}

export default ChatBottom;