export type Response<T = any> = {
	status: number;
	body?: T;
}

export default async (url: string, body?: any, headers?: HeadersInit): Promise<Response> => {
	try {
		return fetch(url, { body, headers, method: "GET" })
			.then(async r => ({ status: r.status, body: await r.json() }));
	} catch (e) {
		console.log(e);
		return { status: 500 };
	}
}