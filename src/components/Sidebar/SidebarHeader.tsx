import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: 'space-between',
}));

interface SidebarHeaderProps {
	handleDrawerClose: () => void;
	handleNewChat: (text: string) => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ handleDrawerClose, handleNewChat }) => {
	return (
		<DrawerHeader>
			<IconButton onClick={handleDrawerClose}>
				<ChevronLeftIcon />
			</IconButton>
			<IconButton onClick={() => handleNewChat('')}>
				<AddCircleOutlineOutlinedIcon />
			</IconButton>
		</DrawerHeader>
	)
}

export default SidebarHeader;