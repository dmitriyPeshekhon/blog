export const sanitizeContentPost = (text) =>
	text
		.replaceAll('<div><br></div>', '\n\n')
		.replaceAll('&nbsp;', '')
		.replaceAll('<div>', '\n')
		.replaceAll('<br>', '')
		.replaceAll('<br/>', '')
		.replaceAll('</div>', '')
		.replace(/ {2,}/g, ' ');
