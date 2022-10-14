import useMainNavStyles from '../../../styles/main/mainNav';
import useAuthStore from '../../../store/authStore';
import { useRouter } from 'next/router';
import ProfileList from './ProfileList';
import DayNightSwitch from '../../utils/DayNightSwitch';

import {
	Box,
	Button,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface IProps {
	drawerIsOpen: boolean;
	setDrawerIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	navbarList: {
		text: string;
		url: string;
		icon: any;
	}[];
}

const Sidebar = ({ drawerIsOpen, setDrawerIsOpen, navbarList }: IProps) => {
	const classes = useMainNavStyles();
	const { userProfile } = useAuthStore();
	const router = useRouter();

	return (
		<Drawer
			anchor="left"
			open={drawerIsOpen}
			onClose={() => setDrawerIsOpen(prevState => !prevState)}
		>
			<Button
				className={classes.closeBtn}
				onClick={() => setDrawerIsOpen(false)}
			>
				<HighlightOffIcon />
			</Button>
			<List className={classes.list}>
				{navbarList.map((nav, i) => (
					<ListItem key={i}>
						<ListItemButton
							onClick={() => {
								setDrawerIsOpen(false);
								router.push(nav.url);
							}}
						>
							<ListItemIcon>
								<nav.icon className={classes.navIcon} />
							</ListItemIcon>
							<ListItemText primary={nav.text} />
						</ListItemButton>
					</ListItem>
				))}
				{!userProfile && (
					<ListItem>
						<ListItemButton
							className={classes.sidebarBtn}
							onClick={() => {
								setDrawerIsOpen(false);
								router.push('/login');
							}}
						>
							<ListItemText primary="馬上開始" />
						</ListItemButton>
					</ListItem>
				)}
				{userProfile && (
					<ProfileList setDrawerIsOpen={setDrawerIsOpen} isSide={true} />
				)}
				<Box display="flex" justifyContent="center" alignItems="center">
					<DayNightSwitch />
				</Box>
			</List>
		</Drawer>
	);
};

export default Sidebar;
