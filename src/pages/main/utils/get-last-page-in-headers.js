export const getLastPageInHeaders = (links) => {
	if (!links) {
		return 1;
	}
	const match = links.match(/_page=(\d{1,4})&_limit=\d{1,3}>; rel="last"/);
	return match ? Number(match[1]) : 1;
};
