import moment from 'moment';
import { getTimeLine, postStatus, uploadMedia } from '../Mastodon';

const DATE_FORMAT = 'YYYY-MM-DD';

const postOnWednesday = async (token: string, media_ids: string, resources: R2Bucket) => {
	const image = await resources.get('wednesday.jpg');
	if (image === null) return;
	const response = await uploadMedia(token, await image.blob());
	console.log(response);

	// if (moment().day() === 3) {
	// 	const [lastPost]: any = await getTimeLine(token);
	// 	const lastPostDate = lastPost ? moment(lastPost.created_at).format(DATE_FORMAT) : null;
	// 	if (!lastPostDate && lastPostDate !== moment().format(DATE_FORMAT)) {
	// 		await postStatus(token, media_ids);
	// 		return "It's Wednesday My Dudes";
	// 	} else return 'Already Posted My Dude';
	// } else return "It's Not Wednesday My Dudes";
	return 'HELLO';
};

export { postOnWednesday };
