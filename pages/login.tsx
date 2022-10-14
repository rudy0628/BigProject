import React, { useCallback } from 'react';
import {
	Grid,
	Container,
	Paper,
	Box,
	Avatar,
	Typography,
	Button,
} from '@mui/material';
import Image from 'next/image';
import Head from 'next/head';
import { GoogleLogin } from '@react-oauth/google';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import Router, { useRouter } from 'next/router';
import useLoginStyles from '../styles/login/login';
import useAuthStore from '../store/authStore';
import useUiStore from '../store/uiStore';
import { createOrGetUser } from '../utility';

const Login = () => {
	const { addUser, removeUser, userProfile } = useAuthStore();
	const { setMessageBar } = useUiStore();
	const classes = useLoginStyles();
	const router = useRouter();
	const year = new Date().getFullYear();

	const loginSuccessHandler = useCallback(
		async (response: any) => {
			try {
				const username = await createOrGetUser(response, addUser);

				// remove the sanity user after 3 days
				setTimeout(() => {
					removeUser();
				}, 3 * 24 * 60 * 60 * 1000);

				// back to main page
				Router.back();

				setMessageBar(true, 'success', `您好，${username}`);
			} catch (e) {
				setMessageBar(true, 'error', `登入失敗，請重新再試!`);
				return;
			}
		},
		[addUser, removeUser, setMessageBar]
	);

	if (userProfile) {
		router.push('/');
		return;
	}

	return (
		<>
			<Head>
				<title>BigProject - 登入</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Container className={classes.container}>
				<Grid container height="100vh" width="100vw" overflow="hidden">
					<Grid item xs={false} sm={4} md={7}>
						<Image
							src="https://source.unsplash.com/random"
							alt="login"
							// width="100%"
							// height="100%"
							layout="fill"
							// objectFit="contain"
							placeholder="blur"
							blurDataURL="https://source.unsplash.com/random"
							style={{ zIndex: '-1' }}
						/>
					</Grid>
					<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>
						<Box className={classes.loginContainer}>
							<Avatar className={classes.lockIcon}>
								<LockOutlinedIcon />
							</Avatar>
							<Typography component="h1" variant="h5">
								登入
							</Typography>
							<GoogleLogin
								onSuccess={loginSuccessHandler}
								onError={() => console.log('error')}
							/>
							<Box className={classes.linkContainer}>
								<Button>忘記密碼?</Button>
								<Button>沒有帳號嗎?辦一個</Button>
							</Box>
							<Typography
								component="span"
								color="#777"
								fontSize={14}
								textAlign="center"
							>
								Copyright © Big Project {year}.
							</Typography>
						</Box>
					</Grid>
				</Grid>
				<Button
					sx={{
						position: 'absolute',
						top: '10px',
						right: '10px',
						display: 'flex',
						alignItems: 'center',
						gap: 1,
					}}
					onClick={() => router.push('/')}
				>
					<KeyboardBackspaceIcon /> 返回首頁
				</Button>
			</Container>
		</>
	);
};

export default Login;
