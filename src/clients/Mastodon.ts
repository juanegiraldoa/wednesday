import type { Env } from '..';

export class Mastodon {
  private readonly URL = 'https://mastodon.social/api/v1';
  private token: string;

  constructor(env: Env) {
    this.token = env.MASTODON_TOKEN;
  }

  private headers() {
    return { Authorization: `Bearer ${this.token}` };
  }

  async getTimeLine() {
    const url = `${this.URL}/timelines/home?limit=1`;
    const response = await fetch(url, { headers: this.headers() });
    return response.json();
  }

  async post(media_ids: string) {
    const url = `${this.URL}/statuses`;
    const body = new FormData();
    body.append('media_ids[]', media_ids);
    const response = await fetch(url, { headers: this.headers(), body, method: 'POST' });
    return await response.json();
  }

  async uploadMedia(media: Blob, description: string) {
    const url = `${this.URL}/media`;
    const body = new FormData();
    body.append('file', media, 'wednesday.jpg');
    body.append('description', description);
    const response = await fetch(url, { headers: this.headers(), body, method: 'POST' });
    return await response.json();
  }
}
