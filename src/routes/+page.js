export async function load({ url, fetch }) {
	const name = url.searchParams.get('name')?.trim();
	
	if (!name) {
		return { name: '', result: null };
	}
	
	try {
		const response = await fetch(`https://api.agify.io?name=${encodeURIComponent(name)}`);
		const result = response.ok ? await response.json() : null;
		
		return { name, result };
	} catch {
		return { name, result: null };
	}
}
