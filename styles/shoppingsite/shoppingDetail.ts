import { makeStyles } from '@mui/styles';

const useShoppingDetailStyles = makeStyles((theme: any) => ({
	detailContainer: {
		display: 'flex',
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
		},
	},
}));

export default useShoppingDetailStyles;
