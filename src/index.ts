import { Wednesday } from './Wednesday';

export interface Env {
  MASTODON_TOKEN: string;
  RESOURCES: R2Bucket;
  BSKY_IDENTIFIER: string;
  BSKY_PASSWORD: string;
}

export default {
  // async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  //   const wednesday = new Wednesday(env);
  //   return new Response(await wednesday.post());
  // },
  async scheduled(_request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    const wednesday = new Wednesday(env);
    return new Response(await wednesday.post());
  },
};
