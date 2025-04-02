import { postOnWednesday } from './WednesdayMyDudes';

export interface Env {
	MASTODON_TOKEN: string;
	RESOURCES: R2Bucket;
	BSKY_IDENTIFIER: string;
	BSKY_PASSWORD: string;
}

export default {
	// async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
	// 	return new Response(await postOnWednesday(env));
	// },
	async scheduled(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return new Response(await postOnWednesday(env));
	},
};
