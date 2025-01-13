import Typography from "@mui/material/Typography";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface UserQueryProps {
	chatMsg: string;
}

const UserQuery: React.FC<UserQueryProps> = ({ chatMsg }) => {
	return (
		<>
			<AccountCircleIcon />
			<Typography variant="h6">{chatMsg}</Typography>
		</>
	)
}

export default UserQuery;