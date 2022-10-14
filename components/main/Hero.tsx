import React from 'react';
import {
	Container,
	Typography,
	Box,
	Button,
	ImageList,
	ImageListItem,
} from '@mui/material';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';

import { imageData } from '../../utility/data/mainPageData';
import useHeroStyles from '../../styles/main/hero';

const Hero = () => {
	const classes = useHeroStyles();

	return (
		<Container maxWidth="xl" className={classes.heroContainer}>
			<Box className={classes.textContainer}>
				<Typography variant="h2">開始使用</Typography>
				<TypeAnimation
					sequence={['線上購物', 1000, '機票訂購', 1000, '社群媒體', 1000]}
					//  Replacing previous Text
					style={{
						fontSize: '4rem',
						display: 'inline',
						margin: '0',
						color: '#42a5f5',
					}}
					wrapper="h3"
					repeat={Infinity}
				/>
				<Typography variant="subtitle1" mt={2} className={classes.subTitle}>
					BigProject
					是一款結合訂購機票、商品及社群媒體的網站，橫向整合提供更好的服務。
				</Typography>
				<Box className={classes.buttonGroup} mt={2}>
					<Button size="large" variant="contained">
						馬上開始
					</Button>
					<Button size="large" variant="outlined">
						查看更多
					</Button>
				</Box>
			</Box>
			<Box className={classes.imageContainer}>
				<ImageList
					variant="masonry"
					cols={3}
					gap={12}
					className={classes.imageList}
				>
					{imageData.map(item => (
						<ImageListItem key={item.img}>
							<Image
								width={248}
								height={248}
								src={`${item.img}?w=248&fit=crop&auto=format`}
								alt={item.title}
								loading="lazy"
								placeholder="blur"
								blurDataURL={`${item.img}?w=248&fit=crop&auto=format`}
							/>
						</ImageListItem>
					))}
				</ImageList>
			</Box>
		</Container>
	);
};

export default Hero;
