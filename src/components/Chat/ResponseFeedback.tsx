import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import IconButton from '@mui/material/IconButton';
import { setResponseFeedback } from '@/redux/responseFeedbackSlice';
import { RootState } from '@/redux/store';

interface ResponseFeedbackProps {
	responseId: string;
	show: boolean
}

const ResponseFeedback: React.FC<ResponseFeedbackProps> = ({ responseId, show }) => {
	const feedback = useSelector((state: RootState) => state.responseFeedback.ratings[responseId] || null);

	const dispatch = useDispatch();
	const handleRating = (newRating: 'like' | 'dislike') => {
		const updatedRating = feedback === newRating ? null : newRating; // Toggle logic
		dispatch(setResponseFeedback({ responseId, rating: updatedRating }));
	};
	return (
		<Box sx={{ display: 'flex', alignItems: 'center', gap: '2px', visibility: `${show ? 'visible' : 'hidden'}` }}>
			<IconButton aria-label="like" onClick={() => handleRating('like')}>
				{feedback !== 'like' ? <ThumbUpAltOutlinedIcon /> : <ThumbUpAltIcon />}
			</IconButton>
			<IconButton aria-label="dislike" onClick={() => handleRating('dislike')}>
				{feedback !== 'dislike' ? <ThumbDownAltOutlinedIcon /> : <ThumbDownAltIcon />}
			</IconButton>
		</Box>
	)
}

export default ResponseFeedback;