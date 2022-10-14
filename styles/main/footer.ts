import { makeStyles } from '@mui/styles';

const useFooterStyles = makeStyles((theme: any) => ({
	container: {
		margin: '4rem auto',
	},
	footerNav: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
		},
	},
	linkGroup: {
		display: 'flex',
		gap: '1rem',
		flexWrap: 'wrap',
	},
}));

export default useFooterStyles;
