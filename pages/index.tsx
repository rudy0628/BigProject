import type { NextPage } from 'next';
import Head from 'next/head';
import { Hero, Introduce, NumberOfUsers, Cards, Cta } from '../components/main';

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>BigProject - 首頁</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Hero />
			<Introduce />
			<NumberOfUsers />
			<Cards />
			<Cta />
		</>
	);
};

export default Home;
