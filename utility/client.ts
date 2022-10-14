import sanityClient from '@sanity/client';

export const client = sanityClient({
	projectId: 'xhm0dme3',
	dataset: 'production',
	apiVersion: '2022-08-22',
	useCdn: false,
	token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
