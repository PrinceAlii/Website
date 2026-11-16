// Markdown for Agents on the free plan. Only "/" runs this script (see `run_worker_first` in
// wrangler.jsonc); every other path is served straight from static assets.
type Env = { ASSETS: { fetch(request: Request): Promise<Response> } };

const wantsMarkdown = (accept: string) =>
	accept.split(",").some((part) => {
		const [type, ...params] = part.trim().toLowerCase().split(";");
		const q = params.find((p) => p.trim().startsWith("q="));
		return type.trim() === "text/markdown" && (!q || Number(q.trim().slice(2)) > 0);
	});

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const markdown = wantsMarkdown(request.headers.get("Accept") ?? "");
		const asset = markdown ? new Request(new URL("/index.md", request.url), request) : request;
		const response = await env.ASSETS.fetch(asset);
		const headers = new Headers(response.headers);
		headers.append("Vary", "Accept");

		if (markdown && response.ok) {
			const body = await response.text();
			headers.set("Content-Type", "text/markdown; charset=utf-8");
			// Rough token count (about four characters per token), as the negotiation check expects.
			headers.set("x-markdown-tokens", String(Math.ceil(body.length / 4)));
			headers.delete("Content-Length");
			return new Response(body, { status: response.status, headers });
		}

		return new Response(response.body, { status: response.status, headers });
	},
};
