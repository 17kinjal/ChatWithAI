
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { drawerWidth } from '@/config/constant'
import { toggleSidebar } from "@/redux/commonSlice";

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	variants: [
		{
			props: ({ open }) => open,
			style: {
				marginLeft: drawerWidth,
				width: `calc(100% - ${drawerWidth}px)`,
				transition: theme.transitions.create(['width', 'margin'], {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.enteringScreen,
				}),
			},
		},
	],
}));

const Header = () => {
	const { isSidebarOpen } = useSelector((state: RootState) => state.common)
	const dispatch = useDispatch();
	const handleDrawerOpen = () => {
		dispatch(toggleSidebar(true))
	}

	return (
		<AppBar position="fixed" open={isSidebarOpen}>
			<Toolbar sx={{ alignItems: 'flex-start' }}>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={handleDrawerOpen}
					edge="start"
					sx={[
						{
							mr: 2,
						},
						isSidebarOpen && { display: 'none' },
					]}
				>
					<MenuIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
	)
}

export default Header;