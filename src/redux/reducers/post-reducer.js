const initialState = {};

export const postReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		default:
			return state;
	}
};
