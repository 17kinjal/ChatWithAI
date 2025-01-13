import { useRef } from "react";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import EmptyChatContainer from "./EmptyChatContainer";
import ChatHeader from "./ChatHeader";
import ChatBottom from "./ChatBottom";
import { setIsResponseLoading, setErrorText, setMessage, saveChatsToLocalStorage } from "@/redux/chatSlice";
const Chat = () => {
	const { currentTitle } = useSelector((state: RootState) => state.chat)
	const dispatch = useDispatch();
	const scrollToLastItem = useRef<HTMLLIElement>(null);

	const submitHandler = async (text: string) => {
		if (!text) return;
		dispatch(setIsResponseLoading(true));
		dispatch(setErrorText(''));
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': import.meta.env.VITE_AUTH_TOKEN,
			},
			body: JSON.stringify({
				message: text,
			}),
		};
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/api/completions`,
				options
			);

			if (response.status === 429) {
				return dispatch(setErrorText('Too many requests, please try again later.'));
			}
			const data = await response.json();

			if (data.error) {
				dispatch(setErrorText(data.error.message));

			} else {
				dispatch(setErrorText(''));
				dispatch(setMessage({ title: text, content: data.response }));
				dispatch(saveChatsToLocalStorage());
				setTimeout(() => {
					scrollToLastItem.current?.lastElementChild?.scrollIntoView({
						behavior: 'smooth',
					});
				}, 1);
			}
		} catch (e: any) {
			dispatch(setErrorText(e.message));
			console.error(e);
		} finally {
			dispatch(setIsResponseLoading(false));
		}
	}

	return (
		<>
			{!currentTitle ?
				<EmptyChatContainer />
				:
				<ChatHeader scrollToLastItem={scrollToLastItem} />
			}
			<ChatBottom submitHandler={submitHandler} />
		</>
	)
}

export default Chat;