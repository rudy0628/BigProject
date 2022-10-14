import { NextRequest, NextResponse } from 'next/server';
import { getUserDataFromToken } from './utility';
import { shoppingItemDetailQuery } from './utility/queries/shoppingsiteQueries';
import { client } from './utility/client';

export async function middleware(req: NextRequest) {
	// shopping item and item detail
	if (req.nextUrl.pathname.startsWith('/api/shoppingsite/shoppingItem')) {
		// get
		if (req.method === 'GET') {
			return NextResponse.next();
		}

		// post
		if (req.method === 'POST') {
			const token: any = req.headers.get('Authorization')?.split(' ')[1];
			const userId = getUserDataFromToken(token);
			if (!userId) {
				// if token === 'null', direct to unAuth api
				req.nextUrl.pathname = '/api/auth/unAuth';
				return NextResponse.redirect(req.nextUrl);
			} else {
				// go to next
				return NextResponse.next();
			}
		}

		// patch and delete
		if (req.method === 'PATCH' || req.method === 'DELETE') {
			const token: any = req.headers.get('Authorization')?.split(' ')[1];
			const userId = getUserDataFromToken(token);
			const itemId = req.nextUrl.pathname.split('/')[4];

			// get item by query
			const query = shoppingItemDetailQuery(itemId);
			const data = await client.fetch(query);

			// if token === 'null' or userId !== item id
			if (!userId || data[0].postedBy._id !== userId) {
				req.nextUrl.pathname = '/api/auth/unAuth';
				return NextResponse.redirect(req.nextUrl);
			} else {
				return NextResponse.next();
			}
		}
	}

	// shopping comments
	if (req.nextUrl.pathname.startsWith('/api/shoppingsite/shoppingComments')) {
		// comments post
		if (req.method === 'POST') {
			const token: any = req.headers.get('Authorization')?.split(' ')[1];
			const userId = getUserDataFromToken(token);
			if (!userId) {
				// if token === 'null', direct to unAuth api
				req.nextUrl.pathname = '/api/auth/unAuth';
				return NextResponse.redirect(req.nextUrl);
			} else {
				// go to next
				return NextResponse.next();
			}
		}

		// comments patch
		if (req.method === 'PATCH') {
			const token: any = req.headers.get('Authorization')?.split(' ')[1];
			const key: any = req.headers.get('key');
			const userId = getUserDataFromToken(token);
			const itemId = req.nextUrl.pathname.split('/')[4];

			// fetch delete comment by item id and key
			let deleteComment: any;
			await client.getDocument(itemId).then((item: any) => {
				for (const comment of item.comments) {
					if (comment._key === key) {
						deleteComment = comment;
					}
				}
			});

			// if token not exist and token === 'null' and deleteComment postedBy userId !== userId
			if (!userId || deleteComment.postedBy._ref !== userId) {
				req.nextUrl.pathname = '/api/auth/unAuth';
				return NextResponse.redirect(req.nextUrl);
			} else {
				return NextResponse.next();
			}
		}
	}

	// shopping cart
	if (req.nextUrl.pathname.startsWith('/api/shoppingsite/shoppingCart')) {
		if (
			req.method === 'POST' ||
			req.method === 'PATCH' ||
			req.method === 'PUT' ||
			req.method === 'GET'
		) {
			const token: any = req.headers.get('Authorization')?.split(' ')[1];
			const userId = getUserDataFromToken(token);
			if (!userId) {
				// if token === 'null', direct to unAuth api
				req.nextUrl.pathname = '/api/auth/unAuth';
				return NextResponse.redirect(req.nextUrl);
			} else {
				// go to next
				return NextResponse.next();
			}
		}
	}

	// airtshop ticketCart
	if (req.nextUrl.pathname.startsWith('/api/airtshop/ticketCart')) {
		if (
			req.method === 'GET' ||
			req.method === 'POST' ||
			req.method === 'PATCH'
		) {
			const token: any = req.headers.get('Authorization')?.split(' ')[1];
			const userId = getUserDataFromToken(token);
			if (!userId) {
				req.nextUrl.pathname = '/api/auth/unAuth';
				return NextResponse.redirect(req.nextUrl);
			} else {
				return NextResponse.next();
			}
		}
	}

	// movement
	if (req.nextUrl.pathname.startsWith('/api/movement')) {
		if (req.method === 'POST') {
			const token: any = req.headers.get('Authorization')?.split(' ')[1];
			const userId = getUserDataFromToken(token);
			if (!userId) {
				req.nextUrl.pathname = '/api/auth/unAuth';
				return NextResponse.redirect(req.nextUrl);
			} else {
				return NextResponse.next();
			}
		}
	}
}
