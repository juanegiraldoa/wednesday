import { AtpAgent, type BlobRef } from '@atproto/api';
import type { Env } from '..';

interface User {
  identifier: string;
  password: string;
}

export class BlueSky {
  private readonly URL = 'https://bsky.social';
  private user: User;
  private agent;

  constructor(env: Env) {
    this.agent = new AtpAgent({ service: this.URL });
    this.user = { identifier: env.BSKY_IDENTIFIER, password: env.BSKY_PASSWORD };
  }

  async login() {
    const { data } = await this.agent.login(this.user);
    const { accessJwt } = data;
    return accessJwt;
  }

  async uploadImage(body: Blob) {
    const headers = { 'Content-Type': 'image/jpeg', Authorization: `Bearer ${await this.login()}` };
    const options = { method: 'POST', headers, body };
    const response = await fetch(`${this.URL}/xrpc/com.atproto.repo.uploadBlob`, options);
    const json = await response.json();
    return json as { blob: BlobRef };
  }

  async post(alt: string, image: BlobRef) {
    const images = [{ alt, image }];
    return await this.agent.post({ text: '', embed: { $type: 'app.bsky.embed.images', images } });
  }
}
