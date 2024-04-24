import { postOnWednesday } from './WednesdayMyDudes';

export interface Env {
	MASTODON_TOKEN: string;
	RESOURCES: R2Bucket;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const token: string = env.MASTODON_TOKEN;
		return new Response(await postOnWednesday(token, env.RESOURCES));
	},
	async scheduled(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const token: string = env.MASTODON_TOKEN;
		return new Response(await postOnWednesday(token, env.RESOURCES));
	},
};
