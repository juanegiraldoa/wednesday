import type { Env } from '.';
import { BlueSky } from './clients/BlueSky';
import { Mastodon } from './clients/Mastodon';
import images from './images.json';

export class Wednesday {
  private readonly images = images;
  private env: Env;

  constructor(env: Env) {
    this.env = env;
  }

  async post() {
    return JSON.stringify({
      mastodon: await this.postOnMastodon(),
      bluesky: await this.postOnBlueSky(),
    });
  }

  private async postOnMastodon() {
    const mastodon = new Mastodon(this.env);
    const image = this.getImageInfo();
    const imageBucket = await this.env.RESOURCES.get(image.image);
    if (imageBucket === null) return 'Wednesday Not Found';
    const imageBlob = await imageBucket.blob();
    const { id } = (await mastodon.uploadMedia(imageBlob, image.description)) as { id: string };
    // await mastodon.post(id);
  }

  private async postOnBlueSky() {
    const blueSky = new BlueSky(this.env);
    const image = this.getImageInfo();
    const imageBucket = await this.env.RESOURCES.get(image.image);
    if (imageBucket === null) return 'Wednesday Not Found';
    const imageBlob = await imageBucket.blob();
    const imagePost = (await blueSky.uploadImage(imageBlob)).blob;
    // await blueSky.post(image.description, imagePost);
  }

  private getImageInfo() {
    const now = new Date();
    if (now.getUTCMonth() === 9) {
      if (now.getUTCDate() + 7 > 31) return images.lastOctoberWednesday;
      return images.octoberWednesday;
    }
    return images.default;
  }
}
