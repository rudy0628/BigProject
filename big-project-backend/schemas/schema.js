// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// general
import user from './user';
import postedBy from './postedBy';

// shopping site
import shoppingItem from './shoppingsite/shoppingItem';
import itemComment from './shoppingsite/itemComment';
import imageList from './shoppingsite/imageList';
import shoppingCart from './shoppingsite/shoppingCart';
import shoppingCartItem from './shoppingsite/shoppingCartItem';

// airtshop
import ticket from './airtshop/ticket';
import ticketCart from './airtshop/ticketCart';
import ticketCartItem from './airtshop/ticketCartItem';

// movements
import movements from './movement/movements';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
	// We name our schema
	name: 'default',
	// Then proceed to concatenate our document type
	// to the ones provided by any plugins that are installed
	types: schemaTypes.concat([
		/* Your types here! */
		user,
		shoppingItem,
		postedBy,
		itemComment,
		imageList,
		shoppingCart,
		shoppingCartItem,
		ticket,
		ticketCart,
		ticketCartItem,
		movements,
	]),
});
