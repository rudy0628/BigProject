export const allShoppingItemsQuery = () => {
	const query = `*[_type == "shoppingItem"] | order(_createdAt desc) {
    _id,
    title,
    price,
    description,
    imageList[] {
      url,
      public_id
    },
    postedBy->{
      _id,
      userName,
      image,
      email
    },
    comments[] {
      review
    },
    date
  }`;

	return query;
};

export const shoppingItemDetailQuery = (
	itemId: string | string[] | undefined
) => {
	const query = `*[_type == "shoppingItem" && _id == '${itemId}']{
    _id,
    title,
    category,
    price,
    description,
    imageList[] {
      url,
      public_id
    },
    postedBy->{
      _id,
      userName,
      image,
      email
    },
    comments[] {
      _key,
      comment,
      review,
      postedBy->{
        _id,
        userName
      }
    },
    date
  }`;

	return query;
};

export const searchShoppingItemQuery = (q: string | string[] | undefined) => {
	const query = `*[_type == "shoppingItem" && title match '${q}' ||category match '${q}'] {
		_id,
    title,
    price,
    description,
    imageList[] {
      url,
      public_id
    },
    postedBy->{
      _id,
      userName,
      image,
      email
    },
    comments[] {
      review
    },
    date
	}`;

	return query;
};

export const shoppingCartQuery = (userId: string | string[] | undefined) => {
	const query = `*[_type == "shoppingCart" && userId == '${userId}'] {
    _id,
    userId,
    shoppingCartItems[] {
      _key,
      amount,
      shoppingItem-> {
        _id,
        title,
        price,
        description,
        imageList[] {
          url,
          public_id
        },
        postedBy->{
          _id,
          userName,
          image,
          email
        },
        comments[] {
          review
        },
        date
      }
    }
  }`;

	return query;
};
