import { useSelector, useDispatch } from 'react-redux';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import SidebarHistory from './SidebarHistory';
import { RootState } from '@/redux/store';
import { toggleSidebar } from '@/redux/commonSlice';
import { drawerWidth } from '@/config/constant';
import SidebarHeader from './SidebarHeader';
import { setCurrentTitle } from '@/redux/chatSlice';

export default function PersistentDrawerLeft() {
	const { isSidebarOpen } = useSelector((state: RootState) => state.common)
	const dispatch = useDispatch();
	const handleDrawerClose = () => {
		dispatch(toggleSidebar(false))
	}

	const handleCurrentChat = (title: string) => {
		dispatch(setCurrentTitle(title))
	}

	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: drawerWidth,
					boxSizing: 'border-box',
				},
			}}
			variant="persistent"
			anchor="left"
			open={isSidebarOpen}
		>
			<SidebarHeader handleDrawerClose={handleDrawerClose} handleNewChat={handleCurrentChat} />
			<Divider />
			<SidebarHistory backToHistoryPrompt={handleCurrentChat} />
		</Drawer>
	);
}
