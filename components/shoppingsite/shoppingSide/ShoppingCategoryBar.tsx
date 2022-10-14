import React from 'react';
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Button,
	Drawer,
	Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import useUiStore from '../../../store/uiStore';
import { useRouter } from 'next/router';

import { categories } from '../../../utility/data/shoppingsiteData';

interface IProps {
	setCategoryIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	categoryIsOpen: boolean;
}

const ShoppingCategoryBar = ({ setCategoryIsOpen, categoryIsOpen }: IProps) => {
	const { setSearchText } = useUiStore();
	const router = useRouter();

	const categoryClickHandler = (category: string) => {
		setCategoryIsOpen(false);
		router.push(`/shoppingsite?q=${category}`);
		setSearchText(`商品類別：${category}`);
	};

	return (
		<Drawer
			anchor="left"
			open={categoryIsOpen}
			onClose={() => setCategoryIsOpen(false)}
		>
			{/* close button */}
			<Button
				sx={{ width: '50px', height: '50px', margin: '10px 0 0 10px' }}
				onClick={() => setCategoryIsOpen(false)}
			>
				<CancelOutlinedIcon />
			</Button>
			{/* category list */}
			{categories.map((category, i) => (
				<Accordion sx={{ width: '350px', boxShadow: 'none' }} key={i}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
					>
						<Typography>{category.type}</Typography>
					</AccordionSummary>
					{category.list.map((item, i) => (
						<AccordionDetails key={i} sx={{ padding: 0 }}>
							<Button
								sx={{
									justifyContent: 'flex-start',
									width: '100%',
									padding: '1rem',
								}}
								onClick={() => categoryClickHandler(`${category.type}/${item}`)}
							>
								{item}
							</Button>
						</AccordionDetails>
					))}
				</Accordion>
			))}
		</Drawer>
	);
};

export default ShoppingCategoryBar;
