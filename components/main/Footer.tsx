import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { Divider } from '@mui/material';
import useFooterStyles from '../../styles/main/footer';

const Footer = () => {
	const year = new Date().getFullYear();
	const classes = useFooterStyles();

	return (
		<>
			<Divider />
			<Container maxWidth="xl" className={classes.container}>
				<Box className={classes.footerNav}>
					<Typography>BigProject</Typography>
					<Box className={classes.linkGroup}>
						<Button variant="text" size="large" color="inherit">
							首頁
						</Button>
						<Button variant="text" size="large" color="inherit">
							關於我們
						</Button>
						<Button variant="outlined" size="large">
							馬上開始
						</Button>
					</Box>
				</Box>
				<Typography marginTop={2} textAlign="center" color="#777">
					© BigProject. {year}, BigProject. All rights reserved
				</Typography>
				<Typography marginTop={2} textAlign="center" color="#777">
					當您訪問我們的網站、服務或工具或與之互動時，我們或我們的授權服務提供商可能會使用
					cookie
					來存儲信息，以幫助為您提供更好、更快和更安全的體驗以及用於營銷目的。
				</Typography>
			</Container>
		</>
	);
};

export default Footer;
