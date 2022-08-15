export default async (url, body, headers) => {
	try {
		return fetch(url, { body, headers })
			.then(async r => ({ status: r.status, body: await r.json() }));
	} catch (e) {
		console.log(e);
		return { status: 500 };
	}
}