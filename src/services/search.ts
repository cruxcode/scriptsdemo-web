export function search(
	query: string,
	lang: string,
	source: string,
	size: number
) {
	const headers = new Headers();
	headers.append("Content-Type", "application/json");
	return fetch("http://3.23.198.147:8080/search", {
		method: "POST",
		headers: headers,
		body: JSON.stringify({ query, lang, source, size }),
	}).then((resp) => resp.json());
}

export function summary(
	queryid: string,
	filename: string,
	lang: string,
	source: string
) {
	return fetch(
		"http://3.23.198.147:8080/search/summary?" +
			`queryid=${queryid}` +
			`&filename=${filename}` +
			`&lang=${lang}` +
			`&source=${source}`,
		{
			method: "GET",
		}
	).then((resp) => resp.json());
}
