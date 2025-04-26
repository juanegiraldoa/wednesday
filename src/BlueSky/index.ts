import { AtpAgent, type BlobRef } from '@atproto/api';

const agent = new AtpAgent({ service: 'https://bsky.social' });

export async function post(identifier: string, password: string, alt: string, blob: Blob) {
  const response = await agent.login({ identifier, password });
  const { accessJwt } = response.data;
  const image = (await uploadImage(accessJwt, blob)).blob;
  await agent.post({
    text: '',
    embed: {
      $type: 'app.bsky.embed.images',
      images: [{ alt, image }],
    },
  });
}

export async function uploadImage(accessJwt: string, image: Blob) {
  const resImage = await fetch('https://bsky.social/xrpc/com.atproto.repo.uploadBlob', {
    method: 'POST',
    headers: {
      'Content-Type': 'image/jpeg',
      Authorization: `Bearer ${accessJwt}`,
    },
    body: image,
  });
  return (await resImage.json()) as { blob: BlobRef };
}
