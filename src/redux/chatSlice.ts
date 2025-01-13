import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface ChatMessage {
	id: string;
	title: string;
	content: string;
	role?: 'user';
}

interface ChatState {
	message: string | null;
	previousChats: ChatMessage[];
	localChats: ChatMessage[];
	currentTitle: string | null;
	isResponseLoading: boolean;
	errorText: string;
}

const initialState: ChatState = {
	message: null,
	previousChats: [],
	localChats: [],
	currentTitle: null,
	isResponseLoading: false,
	errorText: '',
};

const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		setCurrentTitle(state, action: PayloadAction<string>) {
			state.currentTitle = action.payload
		},
		setMessage(state, action: PayloadAction<Omit<ChatMessage, 'id'>>) {
			state.message = action.payload.content;

			if (!state.currentTitle && action.payload.title) {
				state.currentTitle = action.payload.title;
			}
			if (state.currentTitle && action.payload) {
				const newChat = {
					id: (new Date().getTime() * Math.random()).toString(36),
					title: state.currentTitle,
					content: action.payload.title,
					role: 'user'
				};
				const responseMessage = {
					id: (new Date().getTime() * Math.random()).toString(36),
					title: state.currentTitle,
					content: action.payload.content,
				};
				state.previousChats = [
					...state.previousChats,
					newChat,
					responseMessage
				];
				state.localChats = [
					...state.localChats,
					newChat,
					responseMessage
				];
			}
		},
		saveChatsToLocalStorage(state) {
			const updatedChats = [...state.localChats];
			localStorage.setItem('previousChats', JSON.stringify(updatedChats));
		},
		setIsResponseLoading(state, action: PayloadAction<boolean>) {
			state.isResponseLoading = action.payload;
		},
		setErrorText(state, action: PayloadAction<string>) {
			state.errorText = action.payload;
		},
		setLocalChats(state, action: PayloadAction<ChatMessage[]>) {
			state.localChats = action.payload
		}
	},
});

export const {
	setCurrentTitle,
	setMessage,
	saveChatsToLocalStorage,
	setIsResponseLoading,
	setErrorText,
	setLocalChats,
} = chatSlice.actions;

export default chatSlice.reducer;
