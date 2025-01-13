import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types
export type FeedbackState = 'like' | 'dislike' | null;

export interface ResponseRating {
  responseId: string;
  rating: FeedbackState;
}

interface RatingState {
  ratings: Record<string, FeedbackState>;
}

// Utility to safely access localStorage
const getInitialState = (): RatingState => {
	// @ts-ignore
  if (typeof window === 'undefined') {
    return { ratings: {} };
  }
  const storedRatings = localStorage.getItem('ratings');
  return storedRatings ? JSON.parse(storedRatings) : { ratings: {} };
};

// Create slice
const responseFeedbackSlice = createSlice({
  name: 'ratings',
  initialState: getInitialState(),
  reducers: {
    setResponseFeedback: (state, action: PayloadAction<ResponseRating>) => {
      const { responseId, rating } = action.payload;
      state.ratings[responseId] = rating;

			// @ts-ignore
      if (typeof window !== 'undefined') {
        localStorage.setItem('ratings', JSON.stringify(state));
      }
    },
  },
});

export const { setResponseFeedback } = responseFeedbackSlice.actions;
export default responseFeedbackSlice.reducer;
