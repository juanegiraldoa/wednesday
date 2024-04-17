import { postOnWednesday } from './WednesdayMyDudes';

export interface Env {
	MASTODON_TOKEN: string;
	MASTODON_WEDNESDAY_DUDE_MEDIA: string;
	RESOURCES: R2Bucket;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const token: string = env.MASTODON_TOKEN;
		const media_ids: string = env.MASTODON_WEDNESDAY_DUDE_MEDIA;
		return new Response(await postOnWednesday(token, media_ids, env.RESOURCES));
	},
	async scheduled(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const token: string = env.MASTODON_TOKEN;
		const media_ids: string = env.MASTODON_WEDNESDAY_DUDE_MEDIA;
		return new Response(await postOnWednesday(token, media_ids, env.RESOURCES));
	},
};
