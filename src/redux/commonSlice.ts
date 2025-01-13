import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommonState {
	isSidebarOpen: boolean;
}

const initialState: CommonState = {
	isSidebarOpen: true,
};

const commonSlice = createSlice({
	name: 'common',
	initialState,
	reducers: {
		toggleSidebar: (state, action: PayloadAction<boolean>) => {
			state.isSidebarOpen = action.payload;
		},
	},
});

export const { toggleSidebar } = commonSlice.actions;

export default commonSlice.reducer;
