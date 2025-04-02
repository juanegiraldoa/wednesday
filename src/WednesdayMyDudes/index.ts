import type { Env } from '..';
import { post } from '../BlueSky';
import { getTimeLine, postStatus, uploadMedia } from '../Mastodon';

const wednesdayPosts = {
	defaultWednesday: { image: 'wednesday.jpg', description: 'It is Wednesday, my dudes. Big fat frog.' },
	wednesdayOctober: { image: 'october-wednesday.jpg', description: 'It is Wednesday, my dudes. Big skeleton frog.' },
	lastWednesdayOctober: {
		image: 'spoktober-wednesday.jpg',
		description: 'It is Hallowednesday, my doots. Big skeleton frog with trumpet.',
	},
};

const postOnWednesday = async (env: Env) => {
	const now = new Date();
	if (now.getUTCDay() === 3) {
		const token = env.MASTODON_TOKEN;
		const [lastPost] = (await getTimeLine(token)) as { created_at: string }[];
		if (!lastPost || new Date(lastPost.created_at).getDate() !== now.getDate()) {
			const info = getImageInfo(now);
			const image = await env.RESOURCES.get(info.image);
			if (image === null) return 'Wednesday Not Found';
			const imageBlob = await image.blob();
			const { id } = (await uploadMedia(token, imageBlob, info.description)) as { id: string };
			await postStatus(token, id);
			await post(env.BSKY_IDENTIFIER, env.BSKY_PASSWORD, info.description, imageBlob);
			return "It's Wednesday My Dudes";
		}
		return 'Already Posted My Dude';
	}
	return "It's Not Wednesday My Dudes";
};

const getImageInfo = (date: Date) => {
	if (date.getUTCMonth() === 9) {
		if (date.getUTCDate() + 7 > 31) return wednesdayPosts.lastWednesdayOctober;
		return wednesdayPosts.wednesdayOctober;
	}
	return wednesdayPosts.defaultWednesday;
};

export { postOnWednesday };
