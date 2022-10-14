import React, { useEffect, useState } from 'react';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';

// stripe
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// router
import Router, { useRouter } from 'next/router';

// useStore
import useUiStore from '../store/uiStore';

// type
import type { AppProps } from 'next/app';

// components
import MainNav from '../components/main/MainNav/MainNav';
import Footer from '../components/main/Footer';
import MessageBar from '../components/utils/MessageBar';

// utility data
import { mainNavData } from '../utility/data/mainPageData';
import { shoppingsiteNavData } from '../utility/data/shoppingsiteData';
import { airtshopNavData } from '../utility/data/airtshopData';
import createEmotionCache from '../utility/createEmotionCache';

// theme
import lightTheme from '../styles/theme/lightTheme';
import darkTheme from '../styles/theme/darkTheme';

// nprogress
import NProgress from 'nprogress'; //nprogress module

// style
import 'nprogress/nprogress.css'; //styles of nprogress
import '../styles/index.css';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// stripe
const stripePromise = loadStripe(
	`${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`
);

// Route Events and NProgress.
NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// interface
interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

	const { isDarkMode, setIsDarkMode } = useUiStore();
	const [isSSR, setIsSSR] = useState(true);
	const router = useRouter();

	// dynamic navbar list
	let navbarList: any;
	if (router.pathname === '/') {
		navbarList = mainNavData;
	} else if (router.pathname.startsWith('/shoppingsite')) {
		navbarList = shoppingsiteNavData;
	} else if (router.pathname.startsWith('/airtshop')) {
		navbarList = airtshopNavData;
	} else if (router.pathname.startsWith('/movement')) {
		navbarList = [];
	} else {
		navbarList = [];
	}

	// dark mode
	useEffect(() => {
		const themeMode = localStorage.getItem('themeMode');
		if (!themeMode) {
			localStorage.setItem('themeMode', 'light');
		}
		if (themeMode === 'light') {
			setIsDarkMode(false);
		} else if (themeMode === 'dark') {
			setIsDarkMode(true);
		}
	}, [setIsDarkMode]);

	// prevent SSR
	useEffect(() => {
		setIsSSR(false);
	}, []);
	if (isSSR) return null;

	return (
		// stripe
		<Elements stripe={stripePromise}>
			{/* google login */}
			<GoogleOAuthProvider
				clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
			>
				{/* Create emotion cache(ts) */}
				<CacheProvider value={emotionCache}>
					{/* theme */}
					<ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
						<CssBaseline />
						{/* Navbar */}
						{router.pathname !== '/login' && (
							<MainNav navbarList={navbarList} />
						)}
						{/* Message bar */}
						<MessageBar />
						<Component {...pageProps} />
						{/* Footer */}
						{router.pathname !== '/login' && <Footer />}
					</ThemeProvider>
				</CacheProvider>
			</GoogleOAuthProvider>
		</Elements>
	);
}

export default MyApp;
