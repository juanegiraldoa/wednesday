import { getTimeLine, postStatus, uploadMedia } from '../Mastodon';

const postOnWednesday = async (token: string, resources: R2Bucket) => {
	const now = new Date();
	if (now.getDay() === 3) {
		const [lastPost]: any = await getTimeLine(token);
		if (!!lastPost && lastPost.created_at !== now.toISOString()) {
			const image = await resources.get('wednesday.jpg');
			if (image === null) return;
			const { id }: any = await uploadMedia(token, await image.blob());
			await postStatus(token, id);
			return "It's Wednesday My Dudes";
		} else return 'Already Posted My Dude';
	} else return "It's Not Wednesday My Dudes";
};

export { postOnWednesday };
